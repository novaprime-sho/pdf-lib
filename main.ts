
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function fillPdfTemplate() {
    // Load the existing PDF
    const existingPdfBytes = fs.readFileSync('Trade_Assignment_Agreement2003.pdf');

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // forms
    const form = pdfDoc.getForm();
    const allFields = form.getFields();
    for(const field of allFields) {
        const name = field.getName();
        const tf = form.getTextField(name);
        tf.setText(name);
        tf.setFontSize(11);
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Write the PDF to a file
    fs.writeFileSync('output.pdf', pdfBytes);
}

fillPdfTemplate().catch(console.error);