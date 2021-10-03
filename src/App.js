import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBTooltip,
  MDBIcon,
} from "mdbreact";
import { ReactComponent as Logo } from "./assets/logo.svg";
import Routes from "./Routes";
import { Route, BrowserRouter } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Login from "./views/login";
import NavBar from "./components/nav-bar";
import ChartsPage from "./views/chart";
import ConfirmationInscription from "./views/jardin/confirmation-inscription";
import ListJardin from "./views/jardin/list";
import ListEnfants from "./views/jardin/list-enfants";
import ListParent from "./views/parents/list";
import ListEnfantsParent from "./views/parents/list-enfants";
import ListReclamation from "./views/reclamation/liste-reclamation";

function App() {
  const { userId, token, login, logout, user } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route exact path="/" component={ChartsPage} />
        <Route path="/Confirm-inscription" component={ConfirmationInscription} />
        <Route path="/List-jardin" component={ListJardin} />
        <Route path="/List-enfant/:id" component={ListEnfants} />
        <Route path="/List-parent" component={ListParent} />
        <Route path="/List-enfant-parent/:id" component={ListEnfantsParent} />
        <Route path="/reclamation" component={ListReclamation} />

      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" component={Login} />
      </React.Fragment>
    );
  }

  return (
    <Authcontext.Provider
      value={{
        userId: userId,
        token: token,
        login: login,
        logout: logout,
        user: user,
      }}
    >
      <BrowserRouter>
        {!token ? <Login /> : <NavBar content={routes} />}
      </BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
