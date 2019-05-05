import React from 'react'
import TobiAppBar from './TobiAppBar';
import ListContainer from './ListContainer';

class DataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [{ name: 'bispiil 1.0!', items: [{ name: "Banane", checked: 0 }, { name: 'zebra', checked: 0 }] }, { name: 'test 2', items: [{ name: 'Electronics', checked: 0 }] }],
            currentListIndex: 0,
            suggestions: ['Apfel', 'Brot', 'Wasser', 'Milch', 'Schoggi', 'Banane', 'Ovi', 'Spaghetti', 'Teigware', 'Mandarinen', 'Bier', 'Sirup', 'Lauch', 'Zwiebeln', 'Mehl', 'Zucker', 'Pizzateig', 'Pizza', 'Tiefkühlwaren', 'Kaffeepulver', 'Kaffekapseln', 'Honig', 'Tee', 'Gurken', 'Lasagne', 'Aprikosen', 'Toastbrot', 'Brotuufstrich', 'Nutella', 'Confiture', 'Gunfi', 'Brotkranz', 'Käse', 'Poulet', 'Fleisch', 'Sauce (Teigwaren)', 'Suppe', 'Fischstäbli', 'Ananas', 'Amaretto', 'Anis', 'Anchovis', 'Aperol', 'Avocado', 'Salat']
        }
    }

    removeCurrentList() {
        if (this.state.lists.length > 1) {
            let _temp = this.state.lists;
            _temp.splice(this.state.currentListIndex, 1);

            let newCurrentListIndex = this.state.currentListIndex;

            newCurrentListIndex = 0;

            this.setState({
                lists: _temp,
                currentListIndex: newCurrentListIndex
            })
        }
    }

    addNewList(_name) {
        let newList = { name: _name, items: [] }
        this.setState(prevState => ({
            lists: [...prevState.lists, newList]
        }))
    }

    updateCurrentListIndex(index) {
        this.setState({ currentListIndex: index });
    }

    addNewItemToCurrentList(item) {
        console.log("addNewItem invoked!");
        let _temp = this.state.lists;
        _temp[this.state.currentListIndex].items.push(item);

        this.setState({
            lists: _temp
        })
    }

    setItemOfCurrentListAsChecked(index) {
        console.log('setItemOfCurrentListAsChecked invoked!')
        let _temp = this.state.lists;

        _temp[this.state.currentListIndex].items[index].checked++;
        if (_temp[this.state.currentListIndex].items[index].checked >= 3) {
            _temp[this.state.currentListIndex].items[index].checked = 0;
        }

        this.setState({
            lists: _temp
        })
    }

    removeItemFromCurrentList(index) {
        let _temp = this.state.lists;

        _temp[this.state.currentListIndex].items.splice(index, 1);

        this.setState({
            lists: _temp
        })
    }

    setNewListName(name) {
        let _temp = this.state.lists;
        _temp[this.state.currentListIndex].name = name;

        this.setState({
            lists: _temp
        })
    }


    render() {
        return (
            <div className="DataContainer">
                <TobiAppBar
                    title={this.state.lists[this.state.currentListIndex].name}
                    lists={this.state.lists}
                    addNewList={(name) => this.addNewList(name)}
                    currentListIndex={this.state.currentListIndex}
                    updateCurrentListIndex={(index) => this.updateCurrentListIndex(index)}
                />

                <ListContainer
                    suggestions={this.state.suggestions}
                    items={this.state.lists[this.state.currentListIndex].items}
                    addNewItemToCurrentList={(item) => this.addNewItemToCurrentList(item)}
                    setItemOfCurrentListAsChecked={index => this.setItemOfCurrentListAsChecked(index)}
                    removeItemFromCurrentList={index => this.removeItemFromCurrentList(index)}
                    setNewListName={name => this.setNewListName(name)}
                    removeCurrentList={() => this.removeCurrentList()}
                />

                {/*  DEBUG 
                {this.state.lists.map(list => {
                    return (
                        <div>
                            <p>*******{list.name}*******</p>
                            {list.items.map(item => {
                                console.log(item)
                                return (
                                    <div>
                                        {item.name}  + checked: {item.checked}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            */}
            </div>
        )

    }
}

export default DataContainer;