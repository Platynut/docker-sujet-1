const crypto = require('crypto');
const { Sequelize } = require('sequelize');
const UserDto = require('../dto/UserDto');
const User = require('../model/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['passwordHash'] }
        });
        return res.json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['passwordHash'] }
        });
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        return res.json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

exports.createUser = async (req, res) => {
    const { valid, errors, value } = UserDto.validate(req.body);
    if (!valid) {
        return res.status(400).json({ errors });
    }

    try {
        let username = value.username || value.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const passwordHash = await hashPassword(value.password);

        const user = await User.create({
            email: value.email,
            username,
            passwordHash
        });

        const userSafe = user.toJSON();
        delete userSafe.passwordHash;

        return res.status(201).json({ user: userSafe });
    } catch (err) {
        if (err instanceof Sequelize.UniqueConstraintError || err.name === 'SequelizeUniqueConstraintError') {
            const field = err.errors[0]?.path || 'field';
            return res.status(409).json({ error: `This ${field} already in use` });
        }

        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email.toLowerCase();

        await user.save();
        const userSafe = user.toJSON();
        delete userSafe.passwordHash;

        return res.status(200).json({
            message: 'User updated successfully',
            user: userSafe
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email or Username already in use' });
        }
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        await user.destroy();
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return res.status(401).json({ error: 'invalid email or password' });
        }

        const [salt, hash] = user.passwordHash.split('$');
        const inputHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

        if (inputHash !== hash) {
            return res.status(401).json({ error: 'invalid email or password' });
        }

        const userSafe = user.toJSON();
        delete userSafe.passwordHash;

        return res.json({ message: 'Login successful', user: userSafe });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
};

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return `${salt}$${hash}`;
};