const mongoose = require('mongoose');

const Database = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      console.info('[!] MONGODB CONNECTED');
    } catch (error) {
      console.info('[!] MONGODB CONNECTION ERROR');
      console.error(error.message);
    }
  }
};

module.exports = Database;
