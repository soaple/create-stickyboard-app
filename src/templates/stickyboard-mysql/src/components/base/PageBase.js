// src/components/base/PageBase.js

import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TvIcon from '@material-ui/icons/Tv';
import AppsIcon from '@material-ui/icons/Apps';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import { Board, Sticker } from '@stickyboard/core';

import StickerListByCategory from 'components/sticker';

import ApiManager from 'network/ApiManager';
import StatusCode from 'network/StatusCode';
import CookieManager from 'network/CookieManager';

import MessageSnackbar from 'components/ui/MessageSnackbar';

import Const from 'constants/Const';

const styles = (theme) => ({
    root: {
        backgroundColor: theme.colors.contentBackground,
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        right: 16,
        bottom: 16,
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
});

// Generate Sticker dictionary
let StickerDict = {};
Object.values(StickerListByCategory).forEach((stickerList) => {
    stickerList.forEach((StickerObject) => {
        StickerDict[StickerObject.Name] = StickerObject;
    });
});

class PageBase extends React.Component {
    constructor(props) {
        super(props);

        this.board = React.createRef();

        this.state = {
            // React Grid Layout
            currentBreakpoint: 'lg',
            layouts: undefined,
            stickers: undefined,
            // SpeedDial
            isMenuOpen: false,
        };
    }

    componentDidMount() {
        this.initializeLayout();
    }

    setInitialLayout = () => {
        const { initialLayouts, initialStickers } = this.props;

        this.setState({
            layouts: initialLayouts || {
                lg: [],
                md: [],
                sm: [],
                xs: [],
                xxs: [],
            },
            stickers: initialStickers || [],
        });
    };

    initializeLayout = () => {
        const userId = CookieManager.getCookie('userId');
        if (userId) {
            this.props.showMessageSnackbar('Loading...');
            ApiManager.StickyBoard.readUserLayout(
                userId,
                window.location.pathname,
                this.readUserLayoutCallback
            );
        }
    };

    handleCloseMenu = () => {
        this.setState({ isMenuOpen: false });
    };

    handleOpenMenu = () => {
        this.setState({ isMenuOpen: true });
    };

    onLayoutChange = (newLayouts) => {
        this.setState({ layouts: newLayouts });
        console.log(JSON.stringify(newLayouts));
    };

    onSaveLayout = () => {
        const { layouts, stickers } = this.state;

        const userId = CookieManager.getCookie('userId');
        if (userId) {
            ApiManager.StickyBoard.updateUserLayout(
                userId,
                window.location.pathname,
                JSON.stringify(layouts),
                JSON.stringify(stickers),
                this.updateUserLayoutCallback
            );
        }
    };

    handleInsert = () => {
        const { layouts, stickers } = this.state;

        const emptyStickerId = uuidv4();
        const emptyStickerLayoutItem = {
            i: emptyStickerId,
            x: 0,
            y: 0,
            w: 4,
            h: 6,
        };
        const emptySticker = {
            i: emptyStickerId,
            name: 'Empty',
        };

        this.setState({
            layouts: {
                lg: [emptyStickerLayoutItem, ...layouts.lg],
                md: [emptyStickerLayoutItem, ...layouts.md],
                sm: [emptyStickerLayoutItem, ...layouts.sm],
                xs: [emptyStickerLayoutItem, ...layouts.xs],
                xxs: [emptyStickerLayoutItem, ...layouts.xxs],
            },
            stickers: [emptySticker, ...stickers],
        });
    };

    onClickChange = (sticker) => {
        const { showDialog } = this.props;

        showDialog(
            'StickerListDialog',
            {
                currentStickerName: sticker.name,
            },
            (selectedStickerName) => {
                this.handleChangeStickerContent(sticker.i, selectedStickerName);
            }
        );
    };

    handleChangeStickerContent = (stickerId, selectedStickerName) => {
        this.setState((prevState) => ({
            stickers: prevState.stickers.map((sticker) => {
                if (sticker.i === stickerId) {
                    return {
                        i: stickerId,
                        name: selectedStickerName,
                    };
                } else {
                    return sticker;
                }
            }),
        }));
    };

    handleDelete = (targetStickerId) => {
        const { stickers } = this.state;

        this.setState({
            stickers: stickers.filter(
                (sticker) => sticker.i !== targetStickerId
            ),
        });
    };

    readUserLayoutCallback = (statusCode, response) => {
        this.props.hideMessageSnackbar();
        switch (statusCode) {
            case StatusCode.OK:
                this.setState({
                    layouts: JSON.parse(response.layout),
                    stickers: JSON.parse(response.blocks),
                });
                break;
            case StatusCode.NOT_FOUND:
                this.setInitialLayout();
                break;
            default:
                alert(response.msg);
                break;
        }
    };

    updateUserLayoutCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                break;
            default:
                alert(response.msg);
                break;
        }
    };

    render() {
        const { layouts, stickers, isMenuOpen } = this.state;
        const { classes, theme, showDialog, messageSnackbar } = this.props;

        if (!layouts || !stickers) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Board
                    ref={this.board}
                    layouts={layouts}
                    onLayoutChange={this.onLayoutChange}
                    onSaveLayout={this.onSaveLayout}>
                    {stickers.map((sticker, index) => {
                        const StickerObject =
                            StickerDict[sticker.name] ?? StickerDict['Empty'];

                        if (
                            StickerObject &&
                            typeof StickerObject.Component === 'object'
                        ) {
                            return (
                                <Sticker
                                    key={sticker.i}
                                    name={StickerObject.Name}
                                    description={StickerObject.Description}
                                    onChange={() => {
                                        this.onClickChange(sticker);
                                    }}
                                    onDelete={() => {
                                        this.handleDelete(sticker.i);
                                    }}>
                                    <StickerObject.Component
                                        colors={theme.colors}
                                    />
                                </Sticker>
                            );
                        } else {
                            return null;
                        }
                    })}
                </Board>

                <div className={classes.menuContainer}>
                    <SpeedDial
                        ariaLabel="SpeedDial"
                        className={classes.speedDial}
                        icon={<MenuIcon />}
                        onClose={this.handleCloseMenu}
                        onOpen={this.handleOpenMenu}
                        open={isMenuOpen}
                        direction={'up'}>
                        <SpeedDialAction
                            icon={<AddIcon />}
                            tooltipTitle={'Insert Sticker'}
                            onClick={() => {
                                this.handleInsert();
                                this.board.current.setEditingMode(true);
                            }}
                        />

                        <SpeedDialAction
                            icon={<EditIcon />}
                            tooltipTitle={'Toggle Edit mode'}
                            onClick={() => {
                                this.board.current.toggleEditingMode();
                            }}
                        />

                        <SpeedDialAction
                            icon={<TvIcon />}
                            tooltipTitle={'Toggle TV mode'}
                            onClick={() => {
                                this.board.current.toggleTvMode();
                            }}
                        />

                        <SpeedDialAction
                            icon={<AppsIcon />}
                            tooltipTitle={'Sticker List'}
                            onClick={() => {
                                showDialog('StickerListDialog');
                            }}
                        />

                        <SpeedDialAction
                            icon={<PhotoLibraryIcon />}
                            tooltipTitle={'Export to Image'}
                            onClick={() => {
                                showDialog('ExportImageDialog');
                            }}
                        />
                    </SpeedDial>
                </div>

                {/* Message Snackbar */}
                <MessageSnackbar
                    open={messageSnackbar.open}
                    message={messageSnackbar.message}
                />
            </div>
        );
    }
}

PageBase.propTypes = {
    // Style
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    // Layout
    // generateBlock: PropTypes.func.isRequired,
    initialLayouts: PropTypes.object.isRequired,
    initialStickers: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(PageBase);
