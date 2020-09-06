import domToImage from "dom-to-image";
import { saveAs } from "file-saver";
import { DEFAULT_CONFIG, MESSAGE } from './constant.js';

const imageFormatToMethod = {
  svg: 'toSvg',
  png: 'toPng',
  jpeg: 'toJpeg',
}

const dom2image = ({
  target,
  filename = `${DEFAULT_CONFIG.filename}`,
  filenameExtension = `${DEFAULT_CONFIG.filenameExtension}`
}) => {
  const targetEl = typeof target === "string" ?
    document.querySelector(target) :
    target;

  if (!(targetEl instanceof Element)) {
    throw new Error(MESSAGE.error.targetNotDom);
  }

  filename = filename === "" ? DEFAULT_CONFIG.filename : filename;

    domToImage[imageFormatToMethod[filenameExtension]](targetEl)
    .then((dataUrl) => {
      saveAs(dataUrl, `${filename}.${filenameExtension}`);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default dom2image;