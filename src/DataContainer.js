import React from 'react'
import TobiAppBar from './TobiAppBar';
import ListContainer from './ListContainer';
import 'firebase/firestore'

class DataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            currentListIndex: 0,
            suggestions: ['Apfel', 'Brot', 'Wasser', 'Milch', 'Schoggi', 'Banane', 'Ovi', 'Spaghetti', 'Teigware', 'Mandarinen', 'Bier', 'Sirup', 'Lauch', 'Zwiebeln', 'Mehl', 'Zucker', 'Pizzateig', 'Pizza', 'Tiefkühlwaren', 'Kaffeepulver', 'Kaffekapseln', 'Honig', 'Tee', 'Gurken', 'Lasagne', 'Aprikosen', 'Toastbrot', 'Brotuufstrich', 'Nutella', 'Confiture', 'Gunfi', 'Brotkranz', 'Käse', 'Poulet', 'Fleisch', 'Sauce (Teigwaren)', 'Suppe', 'Fischstäbli', 'Ananas', 'Amaretto', 'Anis', 'Anchovis', 'Aperol', 'Avocado', 'Salat'],
            currentUser: null,
            isLoading: false,
            defaultListName: 'TobiList19'
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

                _self.props.firebase.firestore().collection(user.email.replace('.', ',')).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.id + " " + doc.data().items);
                        let _list = { name: doc.data().name, items: doc.data().items };

                        _temp.push(_list);

                        _self.setState({
                            lists: _temp
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
            let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;

            //delete from firestore
            if(this.state.currentUser){
                this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ','))
                .doc(currentListName).delete().then(console.log("delete list from firestore")).catch(error => console.log(error.message));                
            }         

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

        if(this.state.currentUser){
            this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).doc(_name).set({
                name: newList.name, items: newList.items
            })
        }

    }

    updateCurrentListIndex(index) {
        this.setState({ currentListIndex: index });
    }

    addNewItemToCurrentList(item) {
        //add locally   
        let _temp = this.state.lists;
        let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;

        if (_temp[this.state.currentListIndex] && _temp[this.state.currentListIndex].items) {
            _temp[this.state.currentListIndex].items.push(item);
        } else {
            _temp[this.state.currentListIndex] = { name: currentListName, items: [{ name: item.name, checked: 0 }] }
        }

        this.setState({
            lists: _temp
        })

        //add to db
        if (this.state.currentUser) {
            let currentListRef = this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).doc(currentListName);

            currentListRef.get().then(snapshot => {
                if (snapshot.exists) {
                    currentListRef.update({ items: this.props.firebase.firestore.FieldValue.arrayUnion(item) })
                        .then(console.log("successfully updated array in doc"))
                        .catch(e => console.log(e.message))
                } else {
                    currentListRef.set({ name: currentListName, items: this.props.firebase.firestore.FieldValue.arrayUnion(item) })
                        .then(console.log("successfully created new array in doc"))
                        .catch(e => console.log(e.message))
                }
            })
        }
    }

    setItemOfCurrentListAsChecked(index) {
        let _temp = this.state.lists;
        _temp[this.state.currentListIndex].items[index].checked++;
        let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;

        //set locally
        if (_temp[this.state.currentListIndex].items[index].checked >= 3) {
            _temp[this.state.currentListIndex].items[index].checked = 0;
        }

        this.setState({
            lists: _temp
        })

        //aupdate DB with local list
        let currentList = this.state.lists[this.state.currentListIndex];
        if (this.state.currentUser) {
            this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).doc(currentListName).update({
                items: currentList.items,
            }).then(
                console.log('sucessfully updated checked of item')
            ).catch(e => {
                console.log("error updating checked of item: " + e.message)
            })
        }

    }

    removeItemFromCurrentList(index) {
        let _temp = this.state.lists;
        let itemName = this.state.lists[this.state.currentListIndex].items[index].name;
        let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;

        //remove locally
        _temp[this.state.currentListIndex].items.splice(index, 1);
        this.setState({
            lists: _temp
        })

        //update DB with local list
        if (this.state.currentUser) {
            this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).doc(currentListName).update({
                items: this.state.lists,
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        }
    }

    setNewListName(name) {
        //update locally
        let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;
        let _temp = this.state.lists;
        if (name && name.length > 0) {
            _temp[this.state.currentListIndex].name = name;
        } else {
            _temp[this.state.currentListIndex].name = 'nödmal das chasch';
        }

        this.setState({
            lists: _temp
        })

        //update on DB
        if(this.state.currentUser){
            this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).doc(currentListName).update({
                name: this.state.lists[this.state.currentListIndex].name
            }).then(console.log("successfully updated listname")).catch(e => console.log(e.message));
        }
    }

    render() {
        if (this.state.isLoading) {
            return <p>loading...</p>
        } else {
            return (
                <div className="DataContainer">
                    <TobiAppBar
                        title={this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName}
                        lists={this.state.lists}
                        addNewList={(name) => this.addNewList(name)}
                        currentListIndex={this.state.currentListIndex}
                        updateCurrentListIndex={(index) => this.updateCurrentListIndex(index)}
                        currentUser={this.state.currentUser}
                    />

                    <ListContainer
                        suggestions={this.state.suggestions}
                        list={this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex] : []}
                        addNewItemToCurrentList={(item) => this.addNewItemToCurrentList(item)}
                        setItemOfCurrentListAsChecked={index => this.setItemOfCurrentListAsChecked(index)}
                        removeItemFromCurrentList={index => this.removeItemFromCurrentList(index)}
                        setNewListName={name => this.setNewListName(name)}
                        removeCurrentList={() => this.removeCurrentList()}
                    />


                    {/**************DEBUG ************ */}
                    {/* <p>{this.state.currentUser ? this.state.currentUser.email : null}</p>
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
                */}

                </div>
            )
        }
    }
}

export default DataContainer;