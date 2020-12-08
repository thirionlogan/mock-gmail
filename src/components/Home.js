import { useEffect, useState } from 'react';

const Home = ({ handleSetSelectedEmail, searchCriteria }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/emails')
      .then((response) => response.json())
      .then((data) => setEmails(data));
  });

  return (
    <>
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
        .map((email) => {
          return (
            <div
              onClick={() => {
                handleSetSelectedEmail(email.id);
              }}
              key={`email ${email.id}`}
            >{`Sender: ${email.sender} Subject: ${email.subject}`}</div>
          );
        })}
    </>
  );
};

export default Home;
