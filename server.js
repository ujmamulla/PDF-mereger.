const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { mergePdfs } = require('./merge'); // Ensure mergePdfs is correctly exported from merge.js

// Set up Express app
const app = express();
const port = 3000;

// Set up Multer for file uploads
const upload = multer({ dest: path.join(__dirname, 'uploads') });
app.use('/static', express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// Serve the HTML template
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'template/index.html'));
});

// Handle file uploads and merging
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  try {
    // Log the uploaded files
    console.log(req.files);

    // Ensure the files array has at least two files
    if (req.files.length < 2) {
      return res.status(400).send('At least two PDF files are required.');
    }

    // Merge PDFs
    await mergePdfs(
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path),
      path.join(__dirname, 'public/merged.pdf') // Save the merged PDF to the 'public' directory
    );

    // Delete the uploaded files
    req.files.forEach(file => fs.unlinkSync(file.path));

    // Send the merged PDF file
    res.send({ message: 'PDFs merged successfully', fileUrl: '/static/merged.pdf' });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).send('An error occurred while merging PDFs.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
