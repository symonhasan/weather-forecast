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

const mapStateToProps = ( state ) => {
  return{
    userCurrLocData: state.userCurrLocData
  }
}

export default connect( mapStateToProps )( App );
