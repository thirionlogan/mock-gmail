import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import './App.css';
import Home from '../Home';
import EmailDetails from '../EmailDetails';
import ComposeEmail from '../ComposeEmail/ComposeEmail';

function App() {
  const [selectedEmailId, setSelectedEmail] = useState('');

  const handleSetSelectedEmail = (emailId) => {
    setSelectedEmail(emailId);
  };
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <nav>
            <Link
              className='App-Link'
              to='/'
              onClick={() => {
                handleSetSelectedEmail('');
              }}
            >
              <h1>Home</h1>
            </Link>
            <Link
              className='App-Link'
              to='/compose'
              onClick={() => {
                handleSetSelectedEmail('');
              }}
            >
              <h1>Compose</h1>
            </Link>
          </nav>
        </header>
        <main className='App-main'>
          {selectedEmailId ? <Redirect to='/emailDetails' /> : null}
          <Switch>
            <Route path='/emailDetails'>
              <EmailDetails selectedEmailId={selectedEmailId} />
            </Route>
            <Route path='/compose'>
              <ComposeEmail />
            </Route>
            <Route path='/'>
              <Home handleSetSelectedEmail={handleSetSelectedEmail} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
