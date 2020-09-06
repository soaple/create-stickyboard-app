// components/dialog/index.js

import loadable from '@loadable/component';

const StickerListDialog = loadable(() => import('./StickerListDialog'));
const AlertDialog = loadable(() => import('./AlertDialog'));
const ConfirmDialog = loadable(() => import('./ConfirmDialog'));
const ExportPdfDialog = loadable(() => import('./ExportPdfDialog'));
const ExportImageDialog = loadable(() => import('./ExportImageDialog'));

export default {
    StickerListDialog: {
        Name: 'StickerListDialog',
        Description: 'Sticker list dialog',
        Component: StickerListDialog,
    },
    AlertDialog: {
        Name: 'AlertDialog',
        Description: 'AlertDialog sample',
        Component: AlertDialog,
    },
    ConfirmDialog: {
        Name: 'ConfirmDialog',
        Description: 'ConfirmDialog sample',
        Component: ConfirmDialog,
    },
    ExportPdfDialog: {
        Name: 'ExportPdfDialog',
        Description: 'Export dashboard to PDF',
        Component: ExportPdfDialog,
    },
    ExportImageDialog: {
        Name: 'ExportImageDialog',
        Description: 'Export dashboard to Image',
        Component: ExportImageDialog,
    },
}
