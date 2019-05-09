import React from 'react';
import ListView from './ListView';
import TobiAutoComplete from './TobiAutoComplete';
import { Fab, Dialog, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

class ListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editCurrentListDialog: false,
        }
    }

    handleClickOpenFormDialog() {
        this.setState({
            editCurrentListDialog: true,
        })
    }

    handleCloseEditListDialog() {
        this.setState({
            editCurrentListDialog: false,
        })
    }

    setItemAsChecked(index) {
        this.props.setItemOfCurrentListAsChecked(index);
    }

    addItemToList(item) {
        this.props.addNewItemToCurrentList(item);
    };

    removeItemFromList(index) {
        this.props.removeItemFromCurrentList(index);
    }

    setNewListName() {
        this.props.setNewListName(this.state.newListName);
        this.handleCloseEditListDialog();
    }

    removeCurrentList() {
        this.props.removeCurrentList();
        this.handleCloseEditListDialog();
    }

    render() {
        return (
            <div className="ListContainer">
                <ListView list={this.props.list} removeItem={(index) => this.removeItemFromList(index)} checkItem={(index) => this.setItemAsChecked(index)}></ListView>

                <TobiAutoComplete suggestions={this.props.suggestions} addItem={(item) => this.addItemToList(item)} />

                <Fab className="editCurrentListBtn" color='primary' onClick={() => this.handleClickOpenFormDialog()}><EditIcon /></Fab>

                <Dialog
                    open={this.state.editCurrentListDialog}
                    onClose={() => this.handleCloseEditListDialog()}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Listä bearbeitä</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Entwedär löschisch halt en Liistä oder änderisch de Namä. Ziemlich eidütig eigentlich. Fragsch mol dis Mami fallses nid cheggsch.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="neuä Listänamä"
                            type="email"
                            fullWidth
                            onChange={e => { this.setState({ newListName: e.target.value }) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setNewListName()}>
                            Neue namä setzä
                    </Button>
                        <Button variant='contained' color='primary' onClick={() => this.removeCurrentList()}>löschä</Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }
}

export default ListContainer;