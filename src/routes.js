import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./pages/Main";
import Partner from "./pages/Member";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/member" component={Partner} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
