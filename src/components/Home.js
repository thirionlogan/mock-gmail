import { useEffect, useState } from 'react';

const Home = ({ handleSetSelectedEmail }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/emails')
      .then((response) => response.json())
      .then((data) => setEmails(data));
  });

  return (
    <>
      {emails.map((email) => {
        return (
          <div
            onClick={() => {
              handleSetSelectedEmail(email.id);
            }}
          >{`Sender: ${email.sender} Subject: ${email.subject}`}</div>
        );
      })}
    </>
  );
};

export default Home;
