export const PAPER = {
  a3: { w: 297, h: 420 },
  a4: { w: 210, h: 295 },
  a5: { w: 148, h: 210 },
  b3: { w: 353, h: 500 },
  b3: { w: 250, h: 353 },
  b3: { w: 176, h: 250 },
};

export const MESSAGE = {
  error: {
    targetNotDom: "Target is not selector or html element."
  }
};

export const DEFAULT_CONFIG = {
  filename: "dashboard",
  orientation: "p",
  pageFormat: "a4"
}

export const CONFIG = {
  // "portrait" or "landscape" (or shortcuts "p" (Default), "l")
  orientation: [
    {
      value: "p",
      text: "portrait"
    },
    {
      value: "l",
      text: "landscape"
    }
  ],
  /**
   * The format of the first page.
   */
  pageFormat: [
    {
      value: "a3",
      text: "a3"
    },
    {
      value: "a4",
      text: "a4"
    },
    {
      value: "a5",
      text: "a5"
    },
    {
      value: "b3",
      text: "b3"
    },
    {
      value: "b4",
      text: "b4"
    },
    {
      value: "b5",
      text: "b5"
    },
  ]
};