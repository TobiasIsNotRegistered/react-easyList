import React from 'react';
import { Paper, Chip, Avatar, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';


function ListView(props) {

    if (props.items.length > 0) {
        return (
            <Paper className="Paper">
                <Typography variant='headline' ></Typography>

                {props.items.map((item, index) => {
                    return (
                        <Chip 
                            key={item}
                            className="Chip"
                            primary='true'
                            color={item.color}
                            label={item.name}
                            onDelete={() => props.removeItem(index)}
                            deleteIcon={<DoneIcon />}
                            avatar={<Avatar>{item.name.charAt(0) + item.name.charAt(1)}</Avatar>}
                            onClick={() => props.checkItem(index)}>
                        </Chip>
                    )
                })}
            </Paper>
        )
    } else {
        return (<Paper className="Paper">
            <Typography variant='title'>das nix gut diese</Typography>
        </Paper>)
    }
}

export default ListView;