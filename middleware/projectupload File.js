const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// MongoDB connection URL
const mongoURI = process.env.uri;

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg'];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-project-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'uploads', // your bucket name
      filename: `${Date.now()}-project-${file.originalname}`,
    };
  },
});


module.exports= multer({ storage });

