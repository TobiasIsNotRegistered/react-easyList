import React from 'react';
import { Paper, Typography, Divider } from '@material-ui/core';


class StatusContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="StatusContainer">
                <Paper className="Paper">
                    <Typography variant="h5">Status undso</Typography>
                    {this.props.actions.slice().reverse().map((action, index) => {
                        return (
                            <div key={index}>
                                <Divider className="Divider"></Divider>
                                <Typography variant="subtitle1">{action}</Typography>
                            </div>)
                    })}
                </Paper>
            </div>
        )
    }
}

export default StatusContainer;