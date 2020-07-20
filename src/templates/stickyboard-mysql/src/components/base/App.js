// src/components/base/App.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Layout
import Layout from './Layout';
import FullScreenLayout from './FullScreenLayout';
// Signing
const SignInPage = loadable(() => import('components/page/SignInPage'));
const SignUpPage = loadable(() => import('components/page/SignUpPage'));
// Component
const SamplePage= loadable(() => import('components/page/SamplePage'));
// Setting
const SettingsPage= loadable(() => import('components/page/SettingsPage'));
// Superuser
const SuperuserPage= loadable(() => import('components/page/SuperuserPage'));
// Not found
const NotFoundPage= loadable(() => import('components/page/NotFoundPage'));

// Dialog
import DialogDict from 'components/dialog';
// Manager
import LocalStorageManager from 'manager/LocalStorageManager';
// Theme
import StickyBoardThemes from 'theme/StickyBoardThemes';
// Constants
import LocalStorageConst from 'constants/LocalStorageConst';

const themeKeys = Object.keys(StickyBoardThemes);

class App extends React.Component {
    constructor(props) {
        super(props);

        const initialThemeKey = LocalStorageManager.getItem(
            LocalStorageConst.KEY.THEME_KEY,
            themeKeys[0]);
        const initialTheme = StickyBoardThemes[initialThemeKey] || StickyBoardThemes[themeKeys[0]];

        this.state = {
            selectedThemeKey: initialThemeKey,
            muiTheme: createMuiTheme(initialTheme),
        }
    }

    onThemeChange = (themeKey) => {
        const selectedTheme = StickyBoardThemes[themeKey];

        this.setState({
            selectedThemeKey: themeKey,
            muiTheme: createMuiTheme(selectedTheme)
        }, () => {
            LocalStorageManager.setItem(
                LocalStorageConst.KEY.THEME_KEY,
                themeKey);
        });
    }

    render() {
        const {
            selectedThemeKey,
            muiTheme,
        } = this.state;
        const { dialog, hideDialog } = this.props;

        return (
            <MuiThemeProvider theme={muiTheme}>
                <Router>
                    <Switch>
                        {/* Signing pages (FullScreenLayout) */}
                        <Route path={['/signin', '/signup']}>
                            <FullScreenLayout>
                                <Switch>
                                    <Route path='/signin' component={SignInPage} />
                                    <Route path='/signup' component={SignUpPage} />
                                </Switch>
                            </FullScreenLayout>
                        </Route>

                        {/* other pages (Layout) */}
                        <Route path='/'>
                            <Layout
                                themeKeys={themeKeys}
                                selectedThemeKey={selectedThemeKey}
                                onThemeChange={this.onThemeChange}>
                                <Switch>
                                    <Redirect exact from='/' to='/sample' />

                                    {/* Component */}
                                    <Route path='/sample' component={SamplePage} />
                                    {/* Setting */}
                                    <Route path="/settings" component={SettingsPage} />
                                    {/* Superuser */}
                                    <Route path="/superuser"component={SuperuserPage} />
                                    {/* Not found */}
                                    <Route path='*' component={NotFoundPage} />
                                </Switch>
                            </Layout>
                        </Route>
                    </Switch>
                </Router>

                {/* Centralized Dialogs */}
                {Object.keys(DialogDict).map((dialogKey, index) => {
                    const DialogObject = DialogDict[dialogKey];
                    if (
                        DialogObject &&
                        typeof DialogObject.Component === 'object'
                    ) {
                        const dialogState = dialog[dialogKey];
                        return (
                            <DialogObject.Component
                                key={dialogKey}
                                open={dialogState.isOpen}
                                params={dialogState.params}
                                callback={dialogState.callback}
                                onClose={() => {
                                    hideDialog(dialogKey);
                                }} />
                        );
                    } else {
                        return null;
                    }
                })}
            </MuiThemeProvider>
        )
    }
}

export default App;
