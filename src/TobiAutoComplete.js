import React from 'react'
import { Chip, Paper, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fuse from 'fuse.js'

const _suggestions = [];

class TobiAutoComplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',              //the main input for the textfield
            output: _suggestions.slice(0, 10)             //the array of suggestions sorted after score
        }


        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const options = {
            keys: ['name'],
            shouldSort: true,
            includeScore: true,
            includeMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 10,
            maxPatternLength: 32,
            minMatchCharLength: 1,
        }
        this.fuse = new Fuse(this.props.suggestions, options);
    }


    handleChange = (event) => {

        var results = this.fuse.search(event.target.value);

        if(results && results[0] && results[0].matches && results[0].matches[0].value){     
            
            results.forEach(res => {

                if(res.score === 0){
                    res.color='primary'
                }else if(res.score > 0 && res.score < 0.2){
                    res.color='secondary'
                }else{
                    res.color='default'
                }

                res.name = res.matches[0].value
                
            })            
        }else{
            console.log("Search failed. See " + this.className + " for further information.")
        }
       

     


        let temp = results.slice(0, 10);

        this.setState({
            input: event.target.value,
            output: temp
        })


    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.addNewItem(this.state.input);
        }
        if (event.key === "Tab") {
            event.preventDefault();
            console.log("tab was pressed")
            return false;
        }
        if (event.key === '' || event.key === 'spacebar') {
            event.preventDefault();
            console.log("spacebar was pressed");
        }
    }

    addNewItem(newItemName) {
        if (newItemName && newItemName != null) {
            this.props.addItem({ name: newItemName, checked: 0 });
            this.setState({
                input: ''
            })
        }
    }

    render() {
        return (
            <div className="TobiAutoComplete">
                <Paper className="Paper">

                    <Typography variant='headline' ></Typography>

                    <div>
                        <TextField
                            className="TobiAutoComplete__tf_main"
                            onChange={this.handleChange}
                            label="Input"
                            helperText="Start typing to get fitting suggestions"
                            onKeyPress={this.handleKeyPress}
                            value={this.state.input}
                        >
                        </TextField>

                        <Button variant='contained' color='primary' onClick={() => {
                            this.props.addItem({ name: this.state.input })
                        }}>Add</Button>
                    </div>


                    <div className="TobiAutoComplete__container_suggestions">
                        {this.state.output.map((arrayEntry) => {
                            return (
                                <Chip
                                    key={arrayEntry.name}
                                    className="Chip"
                                    label={arrayEntry.name}
                                    color={arrayEntry.color}
                                    onClick={() => {
                                        this.addNewItem(arrayEntry.name);
                                    }} />
                            )
                        })}
                    </div>
                </Paper>
            </div>
        )
    }

}

export default TobiAutoComplete;