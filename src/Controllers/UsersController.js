const User = require('../Models/User');

const UsersController = {
  list: async (req, res) => {
    try {
      const users = await User.find(req.query, { password: 0, tokens: 0 });

      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const user = new User(req.body);

      await user.save();

      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findByCredentials(username, password);

      if (!user) {
        return res.status(401).json({ error: 'Login failed! Check authentication credentials' });
      }

      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      user.tokens = [];

      await user.save();

      res.json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UsersController;
