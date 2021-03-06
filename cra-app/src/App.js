import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Nav from './Nav';
import React from 'react';

function Home() {
  return <h2>This is Home Page</h2>;
}

function SettingPage() {
  return <h2>This is Setting Page</h2>;
}

function Users() {
  return <h2>This is Users Page</h2>;
}
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <h1>Project Maitri (React Codebase)</h1>
        </header>
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <Nav />
          <div style={{ flexGrow: 1, background: 'cadetblue' }}>
            <Route path='/' exact component={Home} />
            <Route path='/settings/' component={SettingPage} />
            <Route path='/users/' component={Users} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
