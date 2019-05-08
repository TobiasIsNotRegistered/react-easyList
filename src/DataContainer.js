import React from 'react'
import TobiAppBar from './TobiAppBar';
import ListContainer from './ListContainer';
import 'firebase/firestore'

class DataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initItems: [{ name: 'bispiil 1.0!', items: [{ name: "veryuniqueitem27", checked: 0 }, { name: 'zebra', checked: 0 }] }, { name: 'test 2', items: [{ name: 'Electronics', checked: 0 }] }],
            lists: [{ name: 'bispiil 1.0!', items: [{ name: "veryuniqueitem27", checked: 0 }] }],
            currentListIndex: 0,
            suggestions: ['Apfel', 'Brot', 'Wasser', 'Milch', 'Schoggi', 'Banane', 'Ovi', 'Spaghetti', 'Teigware', 'Mandarinen', 'Bier', 'Sirup', 'Lauch', 'Zwiebeln', 'Mehl', 'Zucker', 'Pizzateig', 'Pizza', 'Tiefkühlwaren', 'Kaffeepulver', 'Kaffekapseln', 'Honig', 'Tee', 'Gurken', 'Lasagne', 'Aprikosen', 'Toastbrot', 'Brotuufstrich', 'Nutella', 'Confiture', 'Gunfi', 'Brotkranz', 'Käse', 'Poulet', 'Fleisch', 'Sauce (Teigwaren)', 'Suppe', 'Fischstäbli', 'Ananas', 'Amaretto', 'Anis', 'Anchovis', 'Aperol', 'Avocado', 'Salat'],
            currentUser: null,
            isLoading: false,
        }

    }

    componentWillMount() {
        this.setState({
            isLoading: true
        })
    }

    componentDidMount() {
        let _self = this;
        let _temp = this.state.lists;

        this.props.firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _self.setState({ currentUser: user, isLoading: false })

                //init example data                
                _self.state.initItems[0].items.forEach(item => {
                    //_self.addNewItemToCurrentList(item)
                })

                _self.props.firebase.firestore().collection('lists').doc(_self.state.currentUser.email.replace('.', ',')).collection(_self.state.lists[_self.state.currentListIndex].name).get().then(snapshot => {
                    console.log(snapshot);
                    snapshot.forEach(docRef => {
                        console.log(docRef.data())
                        let _name = docRef.data().name;
                        let _checked = docRef.data().checked;
                        _temp[_self.state.currentListIndex].items.push({ name: _name, checked: _checked });
                        /*
                        docRef.get().then(itemSnapshot => {
                            console.log(itemSnapshot.value()).catch(error => console.log(error.message))
                        })
                        */

                        _self.setState({
                            lists: _temp,
                            isLoading: false
                        })
                    })
                })
            } else {
                _self.setState({
                    currentUser: null,
                    isLoading: false
                })
            }
        });
    }

    removeCurrentList() {
        if (this.state.lists.length > 1) {
            let _temp = this.state.lists;

            this.props.firebase.firestore().collection('lists').doc(this.state.currentUser.email.replace('.', ',')).collection(this.state.lists[this.state.currentListIndex].name).get().then(snapshot => {
                snapshot.forEach(doc => {
                    doc.get().then(snapshot => {
                        snapshot.delete().then(console.log('deleted document from list'));
                    })
                })
            })

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
        //add locally   
        let _temp = this.state.lists;
        if (_temp[this.state.currentListIndex]) {
            _temp[this.state.currentListIndex].items.push(item);
        } else {
            _temp[this.state.currentListIndex] = { name: this.state.initItems[0].name, items: [{ name: item.name, checked: 0 }] }
        }

        this.setState({
            lists: _temp
        })

        //add to db
        if (this.state.currentUser) {
            this.props.firebase.firestore().collection('lists').doc(this.state.currentUser.email.replace('.', ',')).collection(this.state.lists[this.state.currentListIndex].name).doc(item.name).set({
                name: item.name,
                checked: item.checked
            }).then(
                console.log('sucessfully wrote to firestore')
            ).catch(e => {
                console.log("error writing to firestore: " + e.message)
            })
        }
    }

    setItemOfCurrentListAsChecked(index) {
        let _temp = this.state.lists;
        _temp[this.state.currentListIndex].items[index].checked++;
        let itemName = this.state.lists[this.state.currentListIndex].items[index].name;

        if (_temp[this.state.currentListIndex].items[index].checked >= 3) {
            _temp[this.state.currentListIndex].items[index].checked = 0;
        }

        this.setState({
            lists: _temp
        })

        //add to db
        if (this.state.currentUser) {
            this.props.firebase.firestore().collection('lists').doc(this.state.currentUser.email.replace('.', ',')).collection(this.state.lists[this.state.currentListIndex].name).doc(itemName).update({
                checked: _temp[this.state.currentListIndex].items[index].checked,
            }).then(
                console.log('sucessfully wrote to firestore')
            ).catch(e => {
                console.log("error writing to firestore: " + e.message)
            })
        }

    }

    removeItemFromCurrentList(index) {
        let _temp = this.state.lists;
        let itemName = this.state.lists[this.state.currentListIndex].items[index].name;

        if (this.state.currentUser) {
            this.props.firebase.firestore().collection('lists').doc(this.state.currentUser.email.replace('.', ',')).collection(this.state.lists[this.state.currentListIndex].name).doc(itemName).delete().then(function () {
                console.log("deleted Item from firestore");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        }

        _temp[this.state.currentListIndex].items.splice(index, 1);
        this.setState({
            lists: _temp
        })
    }

    setNewListName(name) {
        let _temp = this.state.lists;
        if (name && name.length > 0) {
            _temp[this.state.currentListIndex].name = name;
        } else {
            _temp[this.state.currentListIndex].name = 'was sind namä?';
        }

        this.setState({
            lists: _temp
        })
    }

    render() {
        if (this.state.isLoading) {
            return <p>loading...</p>
        } else {
            return (
                <div className="DataContainer">
                    <TobiAppBar
                        title={this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : 'default'}
                        lists={this.state.lists}
                        addNewList={(name) => this.addNewList(name)}
                        currentListIndex={this.state.currentListIndex}
                        updateCurrentListIndex={(index) => this.updateCurrentListIndex(index)}
                        currentUser={this.state.currentUser}    
                    />

                    <ListContainer
                        suggestions={this.state.suggestions}
                        items={this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].items : []}
                        addNewItemToCurrentList={(item) => this.addNewItemToCurrentList(item)}
                        setItemOfCurrentListAsChecked={index => this.setItemOfCurrentListAsChecked(index)}
                        removeItemFromCurrentList={index => this.removeItemFromCurrentList(index)}
                        setNewListName={name => this.setNewListName(name)}
                        removeCurrentList={() => this.removeCurrentList()}
                    />

                    <p>{this.state.currentUser ? this.state.currentUser.email : null}</p>
                    {this.state.lists.map((list, index) => {
                        return (
                            <div key={index}>
                                <p>*******{list.name}*******</p>
                                {list.items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {item.name}  + checked: {item.checked}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}

                </div>
            )
        }
    }
}

export default DataContainer;