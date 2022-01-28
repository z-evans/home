import {
  BrowserRouter as Router,
  Switch,
  Route,
  match,
} from "react-router-dom";
import URLs from "./data/URLs";
import AuthenticationManager from "./managers/AuthenticationManager";
import Dashboard from "./pages/Dashboard";
import FilesIndex from "./pages/files/Index";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Authentication from "./routing/Authentication";

export interface SubRouteProps {
  match: match;
}

const AuthRoute: React.FunctionComponent<SubRouteProps> = ({ match }) => (
  <Authentication
    redirect={URLs.PAGE.Login}
    request={async () => await AuthenticationManager.isAuth()}
  >
    <Route exact path={`${match.path}/files`} component={FilesIndex} />
    <Route exact path={`${match.path}`} component={Dashboard} />
  </Authentication>
);

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={URLs.PAGE.Login} component={LoginPage} />
        <Route exact path={URLs.PAGE.Register} component={RegisterPage} />
        <Route path={URLs.PAGE.Dashboard.Home} component={AuthRoute} />
      </Switch>
    </Router>
  );
}

export default Routes;
