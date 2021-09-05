import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Todo from "./pages/Todo/Todo";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Switch>
        <Route path="/" component={SignUp} exact={true} />
        <Route path="/signin" component={SignIn} exact={true} />
        <Route path="/todo" component={Todo} exact={true} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
