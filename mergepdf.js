const hummus = require('hummus');
const memoryStreams = require('memory-streams');

/**
 * Concatenate two PDFs in Buffers
 * @param {Buffer} firstBuffer 
 * @param {Buffer} secondBuffer 
 * @returns {Buffer} - a Buffer containing the concactenated PDFs
 */
const combinePDFBuffers = (firstBuffer, secondBuffer) =gt; {
    var outStream = new memoryStreams.WritableStream();

    try {
        var firstPDFStream = new hummus.PDFRStreamForBuffer(firstBuffer);
        var secondPDFStream = new hummus.PDFRStreamForBuffer(secondBuffer);

        var pdfWriter = hummus.createWriterToModify(firstPDFStream, new hummus.PDFStreamForResponse(outStream));
        pdfWriter.appendPDFPagesFromPDF(secondPDFStream);
        pdfWriter.end();
        var newBuffer = outStream.toBuffer();
        outStream.end();

        return newBuffer;
    }
    catch(e){
        outStream.end();
        throw new Error('Error during PDF combination: ' + e.message);
    }
};

combinePDFBuffers(PDFBuffer1, PDFBuffer2);