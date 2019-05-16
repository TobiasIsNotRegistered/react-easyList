import React from 'react';
import { Paper, Chip, Avatar, Typography, Divider } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';


const maxLengthSuggestion = 25;

function addEllipsisToName(name) {
    if (name.length > maxLengthSuggestion) {
        name = name.substring(0, maxLengthSuggestion) + "...";
    }
    return name;
}


function ListView(props) {

    if (props.list && props.list.items && props.list.items.length > 0) {
        // the supplied list is reversed in order to display the last item first. The index has to be reversed as well.
        return (
            <Paper className="Paper">
            <Typography variant="h5">{props.list.name}</Typography>
            <Divider className="Divider"></Divider>
                {props.list.items.slice(0).reverse().map((item, index) => {
                    index = props.list.items.length - 1 - index;
                    let _color;
                    let state = item.checked % 3;
                    switch (state) {
                        case 0:
                            _color = 'default'; break;
                        case 1:
                            _color = 'primary'; break;
                        case 2:
                            _color = 'secondary'; break;
                        default:
                            _color = 'default'
                    }

                    return (
                        <Chip
                            key={index}
                            className="Chip"
                            primary='true'
                            color={_color}
                            label={addEllipsisToName(item.name)}
                            onDelete={() => props.removeItem(index)}
                            deleteIcon={<ClearIcon />}
                            avatar={<Avatar>{item.name.charAt(0).toUpperCase()}</Avatar>}
                            onClick={() => props.checkItem(index)}>
                        </Chip>
                    )
                })}
                
                <Typography variant="subtitle2">das sötti alles sii :) </Typography>
            </Paper>
        )
    } else {
        return (
            <Paper className="Paper">
                <Typography variant='h5'>Häh? Lääri listä?</Typography>
                <Typography variant='subtitle1'>Check mal dis Internet.</Typography>
            </Paper>)
    }
}

export default ListView;