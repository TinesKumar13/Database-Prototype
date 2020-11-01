
import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import addCustomer from "./components/addCustomer";
import Dashboard from "./components/Dashboard"
import searchCustomer from "./components/searchCustomer";
import Update from "./components/Update";
import SignIn from "./user/Signin";


const Routes = () => {

  return (

    <BrowserRouter>
    
      <Switch>
        
      
        <Route path= "/" exact component = {SignIn}/>
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/addcustomer" exact component={addCustomer} />
        <PrivateRoute path="/update/:accountNo" exact component={Update} />
        <PrivateRoute path="/searchcustomer" exact component={searchCustomer} />
  

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;