import React, { Component } from "react";
import Home from "./containers/Home/Home";
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <>
        <Home />
      </>
    );
  }
}

export default connect()( App );
