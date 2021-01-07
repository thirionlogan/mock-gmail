import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './ComposeEmail.css';

const ComposeEmail = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [error, setError] = useState();

  const sender = 'jane@galvanize.com';

  const handleSend = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/send', {
      method: 'POST',
      body: JSON.stringify({ sender, recipient, subject, message }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) =>
        data.status === 'success'
          ? setRedirectToHome(true)
          : setError({ message: data.message })
      );
  };

  const handleChangeRecipient = (event) => {
    setRecipient(event.target.value);
  };
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      {redirectToHome ? <Redirect to='/' /> : null}
      <form onSubmit={handleSend} className='composeEmailform'>
        <label>
          To:
          <input
            type='text'
            name='recipient'
            onChange={handleChangeRecipient}
            required
          />
        </label>
        <label>
          Subject:
          <input
            type='text'
            name='subject'
            onChange={handleChangeSubject}
            required
          />
        </label>
        <textarea name='message' onChange={handleChangeMessage} required />
        <input type='submit' value='Submit' />
      </form>
      {error ? <p className='errorMessage'>{error.message}</p> : null}
    </>
  );
};
export default ComposeEmail;
