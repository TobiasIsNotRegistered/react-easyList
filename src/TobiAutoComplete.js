import React from 'react'
import { Chip, Paper, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fuse from 'fuse.js'


const exampleSuggestion = "Biispiel Vorschlag ;)";
const maxLengthSuggestion= 25;

class TobiAutoComplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            input: '',              //the main input for the textfield
            output: [{name: exampleSuggestion, color:'default'}]           //the array of suggestions sorted after score
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
        this.MAX_LENGTH = 24;


    }


    handleChange = (event) => {

        var results = this.fuse.search(event.target.value);

        if (results && results[0] && results[0].matches && results[0].matches[0].value) {

            results.forEach(res => {

                if (res.score >= 0 && res.score <= 0.1) {
                    res.color = 'primary'
                } else if (res.score > 0.1 && res.score < 0.5) {
                    res.color = 'secondary'
                } else {
                    res.color = 'default'
                }
                res.name = res.matches[0].value

            })
        } else {
            console.log("Could not retrieve searchresult!");
            results = [{name: exampleSuggestion, color: 'default'}];
        }

        let temp = results.slice(0, 10);

        this.setState({
            input: event.target.value.substring(0, this.MAX_LENGTH),
            output: temp
        });
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.addNewItemByKeyPress();
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

    addNewItemByKeyPress() {
        let newItemName;
        let deltaLetters;

        if (this.state.output && this.state.output.length > 0 && this.state.output[0].score < 0.1) {
            deltaLetters = this.state.output[0].name.length - this.state.input.length;
            if (deltaLetters >= -1 && deltaLetters <= 1) {
                newItemName = this.state.output[0].name
            } else {
                newItemName = this.state.input;
            }

        } else {
            newItemName = this.state.input;
        }

        if (newItemName && newItemName != null && newItemName.replace(/\s/g, '').length !== 0) {
            newItemName = this.upperCaseFirstLetter(newItemName);
            this.props.addItem({ name: newItemName, checked: 0 });
            this.setState({
                input: ''
            })
        }
    }

    upperCaseFirstLetter(string) {
        string = string.trim();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    addNewItemByClick(_itemName) {
        this.props.addItem({ name: _itemName, checked: 0 });
    }

    addEllipsisToName(name){
        if(name.length > maxLengthSuggestion){
            name = name.substring(0, maxLengthSuggestion) + "...";
        }
        return name;
    }

    
    render() {

        return (
            <div className="TobiAutoComplete">
                <Paper className="Paper">
                    <Typography variant='subtitle2' >Vorschläg: </Typography>
                    <div className="TobiAutoComplete__container_suggestions">
                        {this.state.output.map((arrayEntry, index) => {
                            return (
                                <Chip
                                    key={index}
                                    className="Chip"
                                    label={this.addEllipsisToName(arrayEntry.name)}
                                    color={arrayEntry.color}
                                    onClick={() => {
                                        this.addNewItemByClick(arrayEntry.name);
                                    }} />
                            )
                        })}
                    </div>
                </Paper>
                <Paper className="Paper">



                    <div>
                        <TextField
                            autoFocus
                            className="TobiAutoComplete__tf_main"
                            onChange={this.handleChange}
                            label="Iigabefäld"
                            helperText="Wenn da inetippsch kriegsch paar passendi Vorschläg! :)"
                            onKeyPress={this.handleKeyPress}
                            value={this.state.input}
                        >
                        </TextField>

                        <Button variant='contained' color='primary' onClick={() => {
                            this.addNewItemByKeyPress(this.state.input)
                        }}>Hinzuefüege-böttön</Button>
                    </div>



                </Paper>
            </div>
        )
    }

}

export default TobiAutoComplete;