import { Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = ({ handleSetSelectedEmail, searchCriteria, selectedEmailId }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/emails')
      .then((response) => response.json())
      .then((data) => setEmails(data));
  });

  return (
    <>
      {selectedEmailId ? <Redirect to='/emailDetails' /> : null}
      {emails
        .filter((email) => {
          if (!searchCriteria) return true;
          return (
            email.subject
              .toLowerCase()
              .includes(searchCriteria.toLowerCase()) ||
            email.sender.toLowerCase().includes(searchCriteria.toLowerCase())
          );
        })
        .sort((emailA, emailB) => (emailA.date < emailB.date ? 1 : -1))
        .map((email) => {
          return (
            <div
              onClick={() => {
                handleSetSelectedEmail(email.id);
              }}
              key={`email ${email.id}`}
              className='emailItem'
            >{`Sender: ${email.sender} Subject: ${email.subject}`}</div>
          );
        })}
    </>
  );
};

export default Home;
