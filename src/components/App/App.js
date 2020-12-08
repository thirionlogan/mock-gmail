import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';
import Home from '../Home';
import EmailDetails from '../EmailDetails';
import ComposeEmail from '../ComposeEmail/ComposeEmail';
import PageHeader from '../PageHeader';

function App() {
  const [selectedEmailId, setSelectedEmail] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('');

  const handleSetSelectedEmail = (emailId) => setSelectedEmail(emailId);

  const handleSearch = (searchString) => setSearchCriteria(searchString);

  return (
    <Router>
      <div className='App'>
        <PageHeader
          handleSetSelectedEmail={handleSetSelectedEmail}
          handleSearch={handleSearch}
        />
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
              <Home
                handleSetSelectedEmail={handleSetSelectedEmail}
                searchCriteria={searchCriteria}
              />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
