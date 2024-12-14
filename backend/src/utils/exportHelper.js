const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

exports.exportReport = (format, report, res, graphPath) => {
  if (format === 'csv') {
    const fields = Object.keys(report);
    const parser = new Parser({ fields });
    const csv = parser.parse(report);

    res.header('Content-Type', 'text/csv');
    res.attachment(`${report.title}.csv`);
    return res.send(csv);
  }

  if (format === 'pdf') {
    const doc = new PDFDocument();
    const filename = `${report.title}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);
    doc.fontSize(16).text(report.title, { align: 'center' });
    doc.moveDown();

    for (const [key, value] of Object.entries(report)) {
      if (typeof value === 'number') {
        doc.text(`${key}: ${value}`);
      }
    }

    // Attach graph image
    doc.addPage().image(graphPath, { width: 500, height: 300 });
    doc.end();
    return;
  }

  if (format === 'json') {
    res.json(report);
  }
};
