import React from 'react';
import './App.css';
import DataContainer from './DataContainer.js';
let firebase = require("firebase/app");

//TODO: 
// restrict users from adding the same item twice - firebase uses the name as key
// check if you want to be able to change your list name
// set 'checked' property of item on DB is inefficient as I have to update the entire array. a) do not store 'checked' status on DB or b) build the array out of references and change the item itself or c) think about new strategy to store the data?

class App extends React.Component {

  componentWillMount() {
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

  render() {
    return (
      <div className="App" >
        <DataContainer firebase={firebase}/>
      </div>
    );
  }
}

export default App;
