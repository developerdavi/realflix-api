const fs = require('fs');
const multer = require('multer');

const fileRegex = /.+\.mp4/i;

const MediaController = {
  get: (req, res) => {
    const { id } = req.query;

    const file = `${__dirname}/../../uploads/${id}`;

    fs.stat(file, (err, stats) => {
      if (err) {
        return res.status(404).json({ error: 'Media not found' });
      }

      const { range } = req.headers;
      const { size } = stats;

      const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
      const end = size - 1;
      const chunkSize = (end - start) + 1;

      res.set({
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      });

      res.status(206);

      const stream = fs.createReadStream(file, { start, end });
      stream.on('open', () => stream.pipe(res));
      stream.on('error', (streamErr) => res.end(streamErr));
    });
  },

  upload: async (req, res) => {
    const upload = multer({
      storage: multer.diskStorage({
        destination: function (_req, _file, cb) {
          cb(null, 'uploads');
        },
        filename: function (_req, file, cb) {
          if (!fileRegex.test(file.originalname)) {
            return cb(new Error('Invalid file extension. Should be a MP4'));
          }
          cb(null, file.originalname.replace(/(\s+|,)/g, '_'));
        },
      })
    }).single('media');

    upload(req, res, err => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.sendStatus(201);
    });
  },

  list: async (_req, res) => {
    fs.readdir('uploads', (err, files) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json(files.filter(file => !file.startsWith('.')));
    });
  }
};

module.exports = MediaController;
