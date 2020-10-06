const fs = require('fs');

const MediaController = {
  get: (req, res) => {
    const { id } = req.params;

    const file = `${__dirname}/../../uploads/${id}.mp4`;

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
  }
};

module.exports = MediaController;
