import React from 'react';
import ListView from './ListView';
import TobiAutoComplete from './TobiAutoComplete';

class ListContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items: [],
        }
    }

    setItemAsChecked(index) {
        let temp = this.props.items;
        const numOfCases = 3;

        temp[index].checked += 1;

        let state = temp[index].checked % numOfCases;

        switch (state) {
            case 0:
                temp[index].color = 'default'; break;
            case 1:
                temp[index].color = 'primary'; break;
            case 2:
                temp[index].color = 'secondary'; break;
            default:
                temp[index].color = 'default'
        }

        this.setState({
            items: temp
        })

    }

    addItemToList(item) {
        this.props.addNewItemToCurrentList(item);
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    };

    removeItemFromList(index) {
        console.log(index)
        let temp = this.props.items;
        temp.splice(index, 1);
        this.setState((prevState) => ({
            items: temp
        }))
    }
    

    render() {
        return (
            <div className="ListContainer">
                <ListView items={this.props.items} removeItem={(index) => this.removeItemFromList(index)} checkItem={(index) => this.setItemAsChecked(index)}></ListView>

                <TobiAutoComplete suggestions={this.props.suggestions} addItem={(item) => this.addItemToList(item)} />
            </div>
        )
    }
}

export default ListContainer;