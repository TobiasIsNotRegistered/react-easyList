import React from 'react';
import { Paper, Chip, Avatar, Typography } from '@material-ui/core';
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
        return (
            <Paper className="Paper">
                {props.list.items.map((item, index) => {
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
            </Paper>
        )
    } else {
        return (<Paper className="Paper">
            <Typography variant='subtitle1'>Häh? Lääri listä?</Typography>
        </Paper>)
    }
}

export default ListView;