import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';
import LoginFragment from './LoginFragment';



function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => props.openLogin()}>Login</Button>

                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {props.title}
                    </Typography>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => props.openLists()}>
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


class TobiAppBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loginDrawer: false,
            listDrawer: false
        }
    }

    toggleDrawer = (drawerName, booleanOpen) => () => { 
        this.setState({
            [drawerName]: booleanOpen,
        });
    };

    render() {
        return (
            <div className="AppBar">
                <ButtonAppBar title={this.props.title} openLogin={this.toggleDrawer('loginDrawer', true)} openLists={() => this.toggleDrawer('listDrawer', true)} classes={this} />

                <Drawer
                    anchor="left"
                    open={this.state.loginDrawer}
                    onClose={this.toggleDrawer('loginDrawer', false)}
                >
                    <div
                        className="closingArea"
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('loginDrawer', false)}
                        onKeyDown={this.toggleDrawer('loginDrawer', false)}
                    >
                    </div>

                    <LoginFragment toggleDrawer={this.toggleDrawer('loginDrawer', false)} />
                </Drawer>

                <Drawer
                    anchor="right"
                    open={this.state.listDrawer}
                    onClose={this.toggleDrawer('listDrawer', false)}
                >
                    <div
                        className="closingArea"
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('listDrawer', false)}
                        onKeyDown={this.toggleDrawer('listDrawer', false)}
                    >
                    </div>

                    <p>asdasdasjdbaskjdb</p>
                </Drawer>
            </div>
        )
    }
}

export default TobiAppBar;
