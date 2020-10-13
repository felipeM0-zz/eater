import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./pages/Main";
import Partner from "./pages/Partner";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/partner" component={Partner} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
