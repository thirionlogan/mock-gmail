import { useState } from 'react';
import './ComposeEmail.css';

const ComposeEmail = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sender = 'jane@galvanize.com';

  const handleSend = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/send', {
      method: 'POST',
      body: JSON.stringify({ sender, recipient, subject, message }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
    <form onSubmit={handleSend}>
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
  );
};
export default ComposeEmail;
