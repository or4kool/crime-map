import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login"
import Maps from './components/Maps';
import { createStore } from "redux";
import Search from './components/Search';
// import AppReducer from "./components/reducer"


// const store = createStore({
//   AppReducer
// })


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/maps">
        <Maps />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
    </BrowserRouter>
  );
}

export default App;
