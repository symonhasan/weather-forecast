import React, { Component } from "react";
import Home from "./containers/Home/Home";
import City from "./containers/City/City";
import {connect} from 'react-redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/weather-forecast">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:location" component={City}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ( state ) => {
  return{
    userCurrLocData: state.userCurrLocData
  }
}

export default connect( mapStateToProps )( App );
