import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import BoardAdd from './cmps/board/BoardAdd';
import Navbar from './cmps/Navbar';

import BoardPage from './pages/BoardPage';
import Home from './pages/Home';
import { LoginSignup } from './pages/LoginSignup';
import Template from './pages/Template';
import UserBoards from './pages/UserBoards';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <BoardAdd/>
        <Switch>
          <Route path="/board/:id" component={BoardPage} exact />
          <Route path="/login/:from?" component={LoginSignup} exact />
          <Route path="/signup/:from?" component={LoginSignup} exact />
          <Route path="/userBoards" component={UserBoards} exact />
          <Route path="/template/:id" component={Template} exact />
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
