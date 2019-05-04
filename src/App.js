import React from 'react';
import ListContainer from './ListContainer.js';
import './App.css';
import TobiAppBar from './TobiAppBar.js';
let firebase = require("firebase/app");



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      currentList: [],
      currentListIndex: 0,
      suggestions: ['Apfel', 'Brot', 'Wasser', 'Milch', 'Schoggi', 'Banane', 'Ovi', 'Spaghetti', 'Teigware', 'Mandarinen', 'Bier', 'Sirup', 'Lauch', 'Zwiebeln', 'Mehl', 'Zucker', 'Pizzateig', 'Pizza', 'Tiefkühlwaren', 'Kaffeepulver', 'Kaffekapseln', 'Honig', 'Tee', 'Gurken', 'Lasagne', 'Aprikosen', 'Toastbrot', 'Brotuufstrich', 'Nutella', 'Confiture', 'Gunfi', 'Brotkranz', 'Käse', 'Poulet', 'Fleisch', 'Sauce (Teigwaren)', 'Suppe', 'Fischstäbli', 'Ananas', 'Amaretto', 'Anis', 'Anchovis', 'Aperol', 'Avocado', 'Salat']
    }
  }

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCFUhO6W43CsO4_jebl0G2xMf9vasJ6jo4",
      authDomain: "einkauf-b61cc.firebaseapp.com",
      databaseURL: "https://einkauf-b61cc.firebaseio.com",
      projectId: "einkauf-b61cc",
      storageBucket: "einkauf-b61cc.appspot.com",
      messagingSenderId: "336097420216"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let _temp = [];
    for (var i = 0; i < 5; i++) {
      _temp.push({ name: "biispil " + i });
    }

    this.setState({
      lists: _temp
    })
  }

  addNewList(name) {
    this.setState(prevState => ({
      lists: [...prevState.lists, name]
    }))
  }

  updateCurrentListIndex(index) {
    this.setState({ currentListIndex: index, currentList: this.state.lists[index] });
  }


  render() {
    return (
      <div className="App" >
        <TobiAppBar title="Einkauf" lists={this.state.lists} addNewList={(name) => this.addNewList(name)} currentListIndex={this.state.currentListIndex} updateCurrentListIndex={(index) => this.updateCurrentListIndex(index)} />

        <ListContainer suggestions={this.state.suggestions} items={this.state.lists[this.state.currentListIndex]} />

      </div>
    );
  }
}

export default App;
