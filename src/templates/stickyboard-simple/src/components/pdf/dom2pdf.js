import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PAPER, MESSAGE } from './constant.js';

const dom2pdf = ({ target, pdfOption = {}, imageOption = {} }) => {
  const targetEl = typeof target === "string" ? document.querySelector(target) : target;
  const {
    orientation = "p",
    unit = "mm",
    format = "a4",
    compress = true,
    title = "dashboard"
  } = pdfOption;
  const {
    format: imageFormat = "PNG",
    compress: imageCompress = "FAST"
  } = imageOption;

  if (!(targetEl instanceof Element)) {
    throw new Error(MESSAGE.error.targetNotDom);
  }

  html2canvas(targetEl).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const { w: imgWidth, h: pageHeight } = PAPER[format];
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const doc = new jsPDF(orientation, unit, format, compress);

    let heightLeft = imgHeight;
    let position = 0;

    doc.addImage(imgData, imageFormat, 0, position, imgWidth, imgHeight, "", imageCompress);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(
        imgData,
        imageFormat,
        0,
        position,
        imgWidth,
        imgHeight,
        "",
        imageCompress
      );
      heightLeft -= pageHeight;
    }
    doc.save(`${title}.pdf`);
  });
};

export default dom2pdf;