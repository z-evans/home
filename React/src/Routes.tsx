import {
  BrowserRouter as Router,
  Switch,
  Route,
  match,
} from "react-router-dom";
import URLs from "./data/URLs";
import Dashboard from "./pages/Dashboard";
import FilesIndex from "./pages/files/Index";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Authentication from "./routing/Authentication";

export interface SubRouteProps {
  match: match;
}

const AuthRoute: React.FunctionComponent<SubRouteProps> = ({ match }) => (
  <>
    <Route exact path={`${match.path}/files`} component={FilesIndex} />
    <Route exact path={`${match.path}`} component={Dashboard} />
  </>
);

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={URLs.PAGE.Login} component={LoginPage} />
        <Route exact path={URLs.PAGE.Register} component={RegisterPage} />
        <Authentication redirect={URLs.PAGE.Login}>
          <Route path={URLs.PAGE.Dashboard.Home} component={AuthRoute} />
        </Authentication>
      </Switch>
    </Router>
  );
}

export default Routes;
