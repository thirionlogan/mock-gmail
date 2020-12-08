import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
const EmailDetails = ({ selectedEmailId }) => {
  const [email, setEmail] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/emails/${selectedEmailId}`)
      .then((response) => response.json())
      .then((data) => setEmail(data));
  });

  return (
    <>
      {!selectedEmailId ? <Redirect to='/' /> : null}
      {email ? (
        <div>
          <p>{`From: ${email.sender}`}</p>
          <p>{`To: ${email.recipient}`}</p>
          <p>{`On: ${new Date(email.date).toDateString()}`}</p>
          <p>{`Subject: ${email.subject}`}</p>
          <p>{email.message}</p>
        </div>
      ) : null}
    </>
  );
};

export default EmailDetails;
