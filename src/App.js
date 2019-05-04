import React from 'react';
import TobiAutoComplete from './TobiAutoComplete';
import ListView from './ListView';
import './App.css';
import TobiAppBar from './TobiAppBar.js';
let firebase = require("firebase/app");

//this class handles the list and its entries but is not supposed to display it.

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      suggestions: ['Apfel', 'Brot', 'Wasser', 'Milch', 'Schoggi', 'Banane', 'Ovi', 'Spaghetti', 'Teigware', 'Mandarinen', 'Bier', 'Sirup', 'Lauch', 'Zwiebeln', 'Mehl', 'Zucker', 'Pizzateig', 'Pizza', 'Tiefkühlwaren', 'Kaffeepulver', 'Kaffekapseln', 'Honig', 'Tee', 'Gurken', 'Lasagne', 'Aprikosen', 'Toastbrot', 'Brotuufstrich', 'Nutella', 'Confiture', 'Gunfi', 'Brotkranz', 'Käse', 'Poulet', 'Fleisch', 'Sauce (Teigwaren)', 'Suppe', 'Fischstäbli', 'Ananas', 'Amaretto', 'Anis', 'Anchovis', 'Aperol', 'Avocado']
    }
  };

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
  }

  setItemAsChecked(index) {
    let temp = this.state.items;

    if (temp[index].checked) {
      temp[index].checked = false;
      temp[index].color = 'secondary';
    } else {
      temp[index].checked = true;
      temp[index].color = 'primary';
    }


    this.setState({
      items: temp
    })

  }

  addItemToList(itemName) {
    this.setState(prevState => ({
      items: [...prevState.items, itemName]
    }))
  };

  removeItemFromList(index) {
    console.log(index)
    let temp = this.state.items;
    temp.splice(index, 1);
    this.setState((prevState) => ({
      items: temp
    }))
  }

  render() {
    return (
      <div className="App" >
        <TobiAppBar title="Einkauf" />

        <ListView items={this.state.items} removeItem={(index) => this.removeItemFromList(index)} checkItem={(index) => this.setItemAsChecked(index)}></ListView>

        <TobiAutoComplete suggestions={this.state.suggestions} addItem={(item) => this.addItemToList(item)} />
      </div>
    );
  }
}

export default App;
