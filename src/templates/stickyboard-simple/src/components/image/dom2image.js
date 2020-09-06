import domToImage from "dom-to-image";
import {saveAs} from "file-saver";

const dom2image = ({
  filename = 'dashboard'
}) => {
  const node = document.querySelector('.react-grid-layout');

  domToImage.toBlob(node)
  .then((blob) => {
    saveAs(blob, `${filename}`.png);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default dom2image;