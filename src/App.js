import React from 'react';
import ListContainer from './ListContainer.js';
import './App.css';
import TobiAppBar from './TobiAppBar.js';
import DataContainer from './DataContainer.js';
let firebase = require("firebase/app");



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  }


  render() {
    return (
      <div className="App" >

        <DataContainer />

      </div>
    );
  }
}

export default App;
