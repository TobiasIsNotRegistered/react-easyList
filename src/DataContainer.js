import React from 'react'
import TobiAppBar from './TobiAppBar';
import ListContainer from './ListContainer';

class DataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [{ name: 'bispiil 1.0!', items: [{ name: "Banane", checked: 0 }, { name: 'zebra', checked: 0 }] }],
            currentListIndex: 0,
            suggestions: ['Apfel', 'Brot', 'Wasser', 'Milch', 'Schoggi', 'Banane', 'Ovi', 'Spaghetti', 'Teigware', 'Mandarinen', 'Bier', 'Sirup', 'Lauch', 'Zwiebeln', 'Mehl', 'Zucker', 'Pizzateig', 'Pizza', 'Tiefkühlwaren', 'Kaffeepulver', 'Kaffekapseln', 'Honig', 'Tee', 'Gurken', 'Lasagne', 'Aprikosen', 'Toastbrot', 'Brotuufstrich', 'Nutella', 'Confiture', 'Gunfi', 'Brotkranz', 'Käse', 'Poulet', 'Fleisch', 'Sauce (Teigwaren)', 'Suppe', 'Fischstäbli', 'Ananas', 'Amaretto', 'Anis', 'Anchovis', 'Aperol', 'Avocado', 'Salat']
        }
    }

    componentDidMount() {

    }

    addNewList(_name) {
        let newList = { name: _name, items: [] }
        this.setState(prevState => ({
            lists: [...prevState.lists, newList]
        }))
    }

    updateCurrentListIndex(index) {
        this.setState({ currentListIndex: index});
    }

    addNewItemToCurrentList(item) {
        let _temp = this.state.lists;
        _temp[this.state.currentListIndex].items.push(item);

        this.setState({
            lists: _temp
        })
    }


    render() {
        return (
            <div className="DataContainer">
                <TobiAppBar title={this.state.lists[this.state.currentListIndex].name} lists={this.state.lists} addNewList={(name) => this.addNewList(name)} currentListIndex={this.state.currentListIndex} updateCurrentListIndex={(index) => this.updateCurrentListIndex(index)} />

                <ListContainer suggestions={this.state.suggestions} items={this.state.lists[this.state.currentListIndex].items} addNewItemToCurrentList={(item) => this.addNewItemToCurrentList(item)} />
            </div>
        )
    }


}

export default DataContainer;