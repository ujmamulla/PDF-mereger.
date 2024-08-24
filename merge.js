const PDFMerger = require('pdf-merger-js');
const fs = require('fs');

(async () => {
  try {
    const merger = new PDFMerger();

    // Add PDFs to the merger
    await merger.add('pdf1.pdf');  // Merge all pages of pdf1.pdf
    await merger.add('pdf2.pdf');  // Merge all pages of pdf2.pdf
    // You can uncomment the following lines to merge specific pages if needed
    // await merger.add('pdf2.pdf', [1, 3]); // Merge pages 1 and 3
    // await merger.add('pdf2.pdf', '4, 7, 8'); // Merge pages 4, 7, and 8
    // await merger.add('pdf3.pdf', '3 to 5'); // Merge pages 3 to 5 (3, 4, 5)
    // await merger.add('pdf3.pdf', '3-5'); // Merge pages 3 to 5 (3, 4, 5)

    // Save the merged PDF
    await merger.save('public/merged.pdf');

    // Optional: Export the merged PDF as a Node.js Buffer
    // const mergedPdfBuffer = await merger.saveAsBuffer();
    // fs.writeFileSync('merged.pdf', mergedPdfBuffer);

    console.log('PDFs merged and saved successfully.');
  } catch (error) {
    console.error('Error merging PDFs:', error);
  }
})();

module.exports={mergePdfs}