import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
const EmailDetails = ({ selectedEmailId }) => {
  const [email, setEmail] = useState({});
  const [emailDeleted, setEmaildeleted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/emails/${selectedEmailId}`)
      .then((response) => response.json())
      .then((data) => setEmail(data));
  }, [selectedEmailId]);

  const deleteEmail = () => {
    fetch(`http://localhost:3001/emails/${selectedEmailId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setEmaildeleted(data.status === 'success'));
  };

  return (
    <>
      {!selectedEmailId || emailDeleted ? <Redirect to='/' /> : null}
      {email ? (
        <div>
          <p>{`From: ${email.sender}`}</p>
          <p>{`To: ${email.recipient}`}</p>
          <p>{`On: ${new Date(email.date).toDateString()}`}</p>
          <p>{`Subject: ${email.subject}`}</p>
          <p>{email.message}</p>
          <button onClick={deleteEmail}>Delete</button>
        </div>
      ) : null}
    </>
  );
};

export default EmailDetails;
