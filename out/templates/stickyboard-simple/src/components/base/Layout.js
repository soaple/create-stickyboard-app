// src/components/base/Layout.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

import MenuIcon from '@material-ui/icons/Menu';
import ColorLens from '@material-ui/icons/ColorLens';
import Lock from '@material-ui/icons/Lock';
import Person from '@material-ui/icons/Person';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SocialNotifications from '@material-ui/icons/Notifications';
import Settings from '@material-ui/icons/Settings';
import Info from '@material-ui/icons/Info';
import Warning from '@material-ui/icons/Warning';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import ApiManager from 'network/ApiManager';
import StatusCode from 'network/StatusCode';
import CookieManager from 'network/CookieManager';

import DrawerMenu from './DrawerMenu';

import Const from '../../constants/Const';

import DateUtil from '../../utils/DateUtil';

require('react-grid-layout/css/styles.css');
require('react-resizable/css/styles.css');
require('../../static/css/react-grid-layout.css');

const styles = (theme) => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        // position: 'absolute',
        height: 56,
        [theme.breakpoints.up('sm')]: {
            height: 64,
        },
        // marginLeft: Const.DRAWER_WIDTH,
        // [theme.breakpoints.up('lg')]: {
        //     width: `calc(100% - ${Const.DRAWER_WIDTH}px)`,
        // },
    },
    appBarLogo: {
        width: 48,
        height: 48,
        padding: theme.spacing(1),
    },
    appBarTitle: {
        fontSize: 16,
        // color: theme.colors.colorDark,
        '&:hover': {
            cursor: 'pointer',
        },
    },
    appBarTitleMargin: {
        flex: 1,
    },
    notiIcon: {
        // color: theme.colors.colorDark,
    },
    notiDrawer: {
        width: '80%',
        maxWidth: 360,
        overflow: 'auto',
    },
    notiItem: {
        overflow: 'unset',
    },
    notiIconTypeNotice: {
        // width: 56,
        // height: 56,
        backgroundColor: theme.colors.colorArray[1],
    },
    notiIconTypeWarning: {
        // width: 56,
        // height: 56,
        backgroundColor: theme.colors.colorArray[2],
    },
    notiIconTypeEmergency: {
        // width: 56,
        // height: 56,
        backgroundColor: theme.colors.colorArray[0],
    },
    avatar: {
        width: 56,
        height: 56,
        // color: theme.colors.colorDark,
    },
    drawerPaper: {
        width: Const.DRAWER_WIDTH,
        overflow: 'auto',
        [theme.breakpoints.up('lg')]: {
            width: Const.DRAWER_WIDTH,
            position: 'relative',
            // height: '100%',
            paddingTop: 64,
        },
    },
    content: {
        backgroundColor: theme.colors.contentBackground,
        width: '100%',
        // padding: theme.spacing(1) * 3,
        height: 'calc(100% - 64px)',
        marginTop: 64,
        overflow: 'scroll',
        scrollBehavior: 'smooth',
        overflowScrolling: 'touch',
        WebkitOverflowScrolling: 'touch',
        [theme.breakpoints.up('xs')]: {
            // marginTop: 64,
            fontSize: 14,
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 16,
            // height: 'calc(100% - 64px)',
            // marginTop: 64,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 16,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 16,
            width: 'calc(100% - 240px)',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: 16,
        },
    },
    toolbar: theme.mixins.toolbar,
});

class Layout extends React.Component {
    constructor(props) {
        super(props);

        let currentTimeMillis = new Date().getTime();

        this.state = {
            notifications: [
                {
                    type: Const.NOTI_TYPE_NOTICE,
                    title: 'Sample notice',
                    time: new Date(currentTimeMillis),
                },
                {
                    type: Const.NOTI_TYPE_WARNING,
                    title: 'Sample warning',
                    time: new Date(
                        currentTimeMillis - Const.TIME_MILLIS_HOUR * 3
                    ),
                },
                {
                    type: Const.NOTI_TYPE_EMERGENCY,
                    title: 'Sample emergency',
                    time: new Date(
                        currentTimeMillis - Const.TIME_MILLIS_HOUR * 9
                    ),
                },
            ],
            // Drawer
            menuDrawerOpen: false,
            notiDrawerOpen: false,
            // Theme menu
            themeMenuAnchorElem: null,
            // User menu
            userMenuAnchorElem: null,
        };
    }

    componentDidMount() {}

    handleMenuDrawerToggle = () => {
        this.setState({ menuDrawerOpen: !this.state.menuDrawerOpen });
    };

    handleNotiDrawerToggle = () => {
        this.setState({ notiDrawerOpen: !this.state.notiDrawerOpen });
    };

    openThemeMenu = (event) => {
        this.setState({ themeMenuAnchorElem: event.currentTarget });
    };

    closeThemeMenu = () => {
        this.setState({ themeMenuAnchorElem: null });
    };

    onThemeChange = (themeKey) => {
        this.setState(
            {
                themeMenuAnchorElem: null,
            },
            () => {
                this.props.onThemeChange(themeKey);
            }
        );
    };

    render() {
        const { themeMenuAnchorElem } = this.state;
        const { classes, theme, themeKeys, selectedThemeKey } = this.props;

        const isThemeMenuOpened = Boolean(themeMenuAnchorElem);

        const childrenWithExtraProp = React.Children.map(
            this.props.children,
            (child) => {
                return React.cloneElement(child, {
                    // store: store,
                    // showMessageSnackbar: this.props.showMessageSnackbar,
                    // hideMessageSnackbar: this.props.hideMessageSnackbar,
                });
            }
        );

        const getNotiAvatarByType = (notiType) => {
            if (notiType === Const.NOTI_TYPE_NOTICE) {
                return (
                    <Avatar className={classes.notiIconTypeNotice}>
                        <Info />
                    </Avatar>
                );
            } else if (notiType === Const.NOTI_TYPE_WARNING) {
                return (
                    <Avatar className={classes.notiIconTypeWarning}>
                        <Warning />
                    </Avatar>
                );
            } else if (notiType === Const.NOTI_TYPE_EMERGENCY) {
                return (
                    <Avatar className={classes.notiIconTypeEmergency}>
                        <ErrorOutline />
                    </Avatar>
                );
            }
        };

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    {/* AppBar */}
                    <AppBar position="absolute" className={classes.appBar}>
                        <Toolbar>
                            <Hidden lgUp>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.handleMenuDrawerToggle}>
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>

                            <img
                                src="/static/image/favicon.png"
                                className={classes.appBarLogo}
                            />

                            <Typography
                                type="title"
                                color="inherit"
                                noWrap
                                className={classes.appBarTitle}
                                onClick={() => {
                                    window.location = '/';
                                }}>
                                StickyBoard
                            </Typography>

                            <Typography
                                className={
                                    classes.appBarTitleMargin
                                }></Typography>

                            {/* Theme select menu */}
                            <IconButton
                                className={classes.avatar}
                                aria-owns={
                                    isThemeMenuOpened ? 'menu-appbar' : null
                                }
                                aria-haspopup="true"
                                onClick={this.openThemeMenu}
                                color="inherit">
                                <ColorLens />
                            </IconButton>

                            <Menu
                                styles={{ width: 500 }}
                                id="menu-appbar"
                                anchorEl={themeMenuAnchorElem}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={isThemeMenuOpened}
                                onClose={this.closeThemeMenu}>
                                {themeKeys.map((themeKey, index) => {
                                    return (
                                        <MenuItem
                                            key={themeKey}
                                            selected={
                                                themeKey === selectedThemeKey
                                            }
                                            onClick={() =>
                                                this.onThemeChange(themeKey)
                                            }>
                                            {themeKey}
                                        </MenuItem>
                                    );
                                })}
                            </Menu>

                            <IconButton
                                aria-label="open drawer"
                                onClick={this.handleNotiDrawerToggle}>
                                <SocialNotifications
                                    className={classes.notiIcon}
                                />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    {/* Drawer - Mobile */}
                    <Hidden lgUp>
                        <Drawer
                            variant="temporary"
                            anchor={'left'}
                            open={this.state.menuDrawerOpen}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            onClose={this.handleMenuDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}>
                            <DrawerMenu
                                isSuperuser={false}
                                permissionKeyArray={[]}
                            />
                        </Drawer>
                    </Hidden>

                    {/* Drawer - Desktop */}
                    <Hidden mdDown>
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}>
                            <DrawerMenu
                                isSuperuser={false}
                                permissionKeyArray={[]}
                            />
                        </Drawer>
                    </Hidden>

                    {/* Right Drawer - Notification */}
                    <Drawer
                        type="temporary"
                        anchor="right"
                        open={this.state.notiDrawerOpen}
                        classes={{
                            paper: classes.notiDrawer,
                        }}
                        onClose={this.handleNotiDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        {this.state.notifications.map((noti, index) => {
                            return (
                                <Card key={index} className={classes.notiItem}>
                                    <CardHeader
                                        avatar={getNotiAvatarByType(noti.type)}
                                        title={noti.title}
                                        subheader={DateUtil.format(noti.time)}
                                    />
                                </Card>
                            );
                        })}
                    </Drawer>

                    {/* App content */}
                    <main
                        id="stickyboard-container"
                        className={classes.content}>
                        {childrenWithExtraProp}
                    </main>
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);
