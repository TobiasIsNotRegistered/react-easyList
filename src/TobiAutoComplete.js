import React from 'react'
import { Chip, Paper, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


const options = [];

class TobiAutoComplete extends React.Component {
    constructor(props) {
        super(props);

        props.suggestions.map(str => {
            return (
                options.push({ name: str, score: 0, perfectMatch: 'secondary' })
            )
        });

        this.state = {
            input: '',              //the main input for the textfield
            output: options.slice(0, 10)             //the array of suggestions sorted after score
        }


        this.handleChange = this.handleChange.bind(this);
    }

    wordContainsSequence(word, sequence) {
        word = word.toLocaleLowerCase();
        sequence = sequence.toLocaleLowerCase();

        let score = 0;

        for (let i = 0; i < sequence.length; i++) {
            if (word.charAt(i) === sequence.charAt(i)) {
                score++;
            } else {
                //TODO: check neighbour characters
            }
        }
        return score;
    };

    handleChange = (event) => {

        options.forEach(option => {
            option.score = this.wordContainsSequence(option.name, event.target.value);

            if (option.name.length === option.score && event.target.value.length === option.score) {
                option.perfectMatch = 'primary'
            } else if (event.target.value.length === option.score && option.name.length !== option.score) {
                option.perfectMatch = 'secondary'
            } else {
                option.perfectMatch = 'default'
            }
        })

        options.sort((op1, op2) => {
            return (op2.score - op1.score)
        });

        let temp = options.slice(0, 10);

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
        this.props.addItem({ name: newItemName });
        this.setState({
            input: ''
        })
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
                                    label={arrayEntry.score + " : " + arrayEntry.name}
                                    color={arrayEntry.perfectMatch}
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