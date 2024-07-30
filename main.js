"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_lib_1 = require("pdf-lib");
const fs_1 = __importDefault(require("fs"));
function fillPdfTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        // Load the existing PDF
        const existingPdfBytes = fs_1.default.readFileSync('Trade_Assignment_Agreement2003.pdf');
        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = yield pdf_lib_1.PDFDocument.load(existingPdfBytes);
        // Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        // forms
        const form = pdfDoc.getForm();
        const allFields = form.getFields();
        for (const field of allFields) {
            const name = field.getName();
            const tf = form.getTextField(name);
            tf.setText(name);
            tf.setFontSize(11);
        }
        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = yield pdfDoc.save();
        // Write the PDF to a file
        fs_1.default.writeFileSync('output.pdf', pdfBytes);
    });
}
fillPdfTemplate().catch(console.error);
