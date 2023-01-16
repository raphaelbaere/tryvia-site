import React from 'react';
import { Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './Pages/Login';
import Feedbacks from './Pages/Feedbacks';
import Settings from './Pages/Settings';
import Ranking from './Pages/Ranking';
import Game from './Pages/Game';
import ResponsiveAppBar from './Components/Header2';

export default function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/game" render={ (props) => <Game { ...props } /> } />
        <Route path="/settings" render={ (props) => <Settings { ...props } /> } />
        <Route path="/feedbacks" render={ (props) => <Feedbacks { ...props } /> } />
        <Route path="/ranking" render={ (props) => <Ranking { ...props } /> } />
      </header>
      <footer>
        <p>© Equipe Tryvial, 2023</p>
      </footer>
    </div>
  );
}
