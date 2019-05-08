import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginFragment from './LoginFragment';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import ListsFragment from './ListsFragment';
import { Drawer, Switch } from '@material-ui/core';


function ButtonAppBar(props) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar className="AppBar" >
                    <Button color="inherit" onClick={() => props.openLogin()}>{props.currentUser ? props.currentUser.email : 'iilogge'}</Button>

                    <Typography variant="h6" color="inherit" noWrap={true} >
                        {props.title}
                    </Typography>
                    <IconButton color="inherit" aria-label="Menu" onClick={() => props.openLists()}>
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </div>
    );
}




class TobiAppBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loginDrawer: false,
            listDrawer: false,
            formDialog: false
        }
    }

    toggleDrawer = (drawerName, booleanOpen) => () => {
        this.setState({
            [drawerName]: booleanOpen,
        });
    };

    handleClickOpenFormDialog = () => {
        this.setState({ formDialog: true });
    };

    handleCloseFormDialog = () => {
        this.setState({ formDialog: false });
    };

    handleAddList = () => {
        this.handleCloseFormDialog();
        this.props.addNewList(this.state.newListName);

    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleAddList();
        }
    }


    render() {
        return (
            <div >
                <ButtonAppBar currentUser={this.props.currentUser} title={this.props.title ? this.props.title : 'Unbenannt'} openLogin={this.toggleDrawer('loginDrawer', true)} openLists={this.toggleDrawer('listDrawer', true)} classes={this} />

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


                    <ListsFragment
                        handleCloseDrawer={this.toggleDrawer('listDrawer', false)}
                        lists={this.props.lists} handleClickOpenFormDialog={this.handleClickOpenFormDialog}
                        currentListIndex={this.props.currentListIndex}
                        updateCurrentListIndex={(index) => this.props.updateCurrentListIndex(index)} />
                </Drawer>

                <Dialog
                    open={this.state.formDialog}
                    onClose={this.handleCloseFormDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Neui Listä</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Psst, aktivier de switch wenns okay isch dass dNSA dini Listänä speicheret.
                            {this.state.nsa ? (<div><br /> Dankö :)</div>) : null}
                        </DialogContentText>
                        <Switch onChange={(event) => { this.setState({ nsa: event.target.checked }) }}></Switch>
                        <TextField
                            onKeyPress={this.handleKeyPress}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Listänamä"
                            type="email"
                            fullWidth
                            onChange={e => { this.setState({ newListName: e.target.value }) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseFormDialog} color="primary">
                            Abbräche
                    </Button>
                        <Button onClick={this.handleAddList} color="primary">
                            Guet so!
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TobiAppBar;
