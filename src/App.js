import React, {useEffect} from 'react';
import './App.css';
import store from './Redux/Store/store';
import {useDispatch, useSelector} from "react-redux";
import {isUserLoggedIn} from "./Redux/Actions";
import {Route, Switch} from "react-router-dom";
import PrivateRoute from "./Components/HOC/PrivateRoute";
import SignIn from "./Container/SignIn";
import Home from "./Container/Home";
import Products from "./Container/Products";
import Team from "./Container/Team";
import Contacts from './Container/Contacts';



function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  },[]);

  return (
    <div>
        <Switch>
            <PrivateRoute exact={true} path="/" component={Home} />
            <PrivateRoute path="/dashboard" component={Home} />
            <Route path={"/signin"} component={SignIn} />
            <Route path={"/product"} component={Products} />
            <Route path={"/team"} component={Team} />
            <Route path={'/contacts'} component={Contacts} />
        </Switch>
    </div>
  );
}

export default App;
