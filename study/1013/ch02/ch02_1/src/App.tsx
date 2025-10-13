import React from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from "./components/Profile";
import Demo from "./components/Demo";
import EventListener from './pages/EventListener';

const children = [
  <li>
    <a href = "https://www.google.com">
    <p> go to Google</p>
    </a>
  </li>,
  <li>
    <a href = "https://www.twitter.com">
    <p> go to Twitter</p>
    </a>
  </li>,
  <li>
    <a href = "https://www.facebook.com">
    <p> go to Facebook</p>
    </a>
  </li>
]

function App() {
  return (
    <ul>
      <li>
        <EventListener />
      </li>
      <li>
        <Profile />
      </li>
      <li>
        <a href = "https://www.naver.com">
        <p>go to naver</p>
        </a> 
      </li>
        {children}
      <li>
        <Demo />
      </li>
    </ul>
  );
}

export default App;
