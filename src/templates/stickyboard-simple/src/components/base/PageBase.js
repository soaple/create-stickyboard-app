// src/components/base/PageBase.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';

import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import TvIcon from '@material-ui/icons/Tv';
import AppsIcon from '@material-ui/icons/Apps';

import { Board, Sticker } from '@stickyboard/core';

import StickerListByCategory from 'components/sticker';

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
            layout: undefined,
            blocks: undefined,
            isEditingMode: true,
            // SpeedDial
            isMenuOpen: false,
        };
    }

    componentDidMount() {
        this.setInitialLayout();
    }

    setInitialLayout = () => {
        this.setState({
            layout: this.props.initialLayout,
            blocks: this.props.initialBlocks,
        });
    };

    handleCloseMenu = () => {
        this.setState({ isMenuOpen: false });
    };

    handleOpenMenu = () => {
        this.setState({ isMenuOpen: true });
    };

    onLayoutChange = (newLayouts) => {
        this.setState({ layout: newLayouts });
        console.log(JSON.stringify(newLayouts));
    };

    onSaveLayout = () => {
        const { layout, blocks } = this.state;
        console.log(layout);
        console.log(blocks);
    };

    render() {
        const { layout, blocks, isEditingMode, isMenuOpen } = this.state;
        const { classes, theme, showDialog, messageSnackbar } = this.props;

        if (!layout || !blocks) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Board
                    ref={this.board}
                    layouts={layout}
                    onLayoutChange={this.onLayoutChange}
                    onSaveLayout={this.onSaveLayout}>
                    {blocks.map((block, index) => {
                        const StickerObject = StickerDict[block.i];

                        if (
                            StickerObject &&
                            typeof StickerObject.Component === 'object'
                        ) {
                            return (
                                <Sticker key={block.i}>
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
    initialLayout: PropTypes.object.isRequired,
    initialBlocks: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(PageBase);
