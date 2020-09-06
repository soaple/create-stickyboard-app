export const MESSAGE = {
  error: {
    targetNotDom: "Target is not selector or html element."
  }
};

export const DEFAULT_CONFIG = {
  filename: "dashboard",
  filenameExtension: 'png',
  useThemeBackgroundColor: true
};

export const CONFIG = {
  // Image file extensions supported by the dom-to-image library
  filenameExtension: [
    {
      value: "png",
      text: "png"
    },
    {
      value: "jpeg",
      text: "jpeg"
    },
    {
      value: "svg",
      text: "svg"
    },
  ],
};