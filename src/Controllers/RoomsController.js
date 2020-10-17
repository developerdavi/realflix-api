const Room = require('../Models/Room');

const RoomsController = {
  create: async (req, res) => {
    const room = new Room({
      ...req.body,
      owner: req.user._id
    });

    try {
      await room.save();
      res.status(201).json(room);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  get: async (req, res) => {
    const { id } = req.params;

    try {
      const room = await Room.findById(id);

      if (!room) {
        return res.sendStatus(404);
      }

      if (room.password) {
        if (room.password !== req.query.password) {
          return res.sendStatus(403);
        }
      }

      res.json(room);
    } catch (error) {
      res.status(404).json({ error: 'Room not found' });
    }
  },

  list: async (req, res) => {
    const rooms = await Room.aggregate([
      {
        $match: req.query
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner'
        }
      },
      {
        $unwind: '$owner'
      },
      {
        $project: {
          'owner.tokens': 0
        }
      }
    ]);

    res.json(rooms);
  }
};

module.exports = RoomsController;
