import React from 'react';
import { Typography, Fab, Divider, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListView from './ListView';

class ListsFragment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="ListsFragment">
                <Typography variant="headline">Dini listänä</Typography>
                <Divider className="Divider" />

                
                {this.props.lists.length > 0 ? (
                    this.props.lists.map((list, index) => {
                        let _selected = this.props.currentListIndex === index ? true : false;
                    return (
                        <MenuItem selected={_selected} key={index} onClick={() => {this.props.updateCurrentListIndex(index)}}>{list.name}</MenuItem>
                    )
                })):(
                    (<p>läär</p>)
                )}
                
                <Fab className="addNewListBtn" color='primary' onClick={() => this.props.handleClickOpenFormDialog()}><AddIcon /></Fab>
            </div>
        )
    }
}

export default ListsFragment;