import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.scss';
import App from './App';
import Home from "./home/Home";
import Systems from './systems/Systems';
import reportWebVitals from './reportWebVitals';
import Games from './games/Games';
import GameDetail from './games/detail/GameDetail';
import Login from './Login';
import MyGames from './my-games/MyGames';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="systems" element={<Systems />} />
          <Route path="games" element={<Games />} />
          <Route path="my-games" element={<MyGames />} />
          <Route path="games/:gameId" element={<GameDetail />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
