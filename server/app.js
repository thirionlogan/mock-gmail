const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const emails = JSON.parse(fs.readFileSync(path.join('server', 'emails.json')));

app.use(express.static(path.resolve('./build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./build', 'index.html'));
});

app.get('/api/emails', (req, res) => res.json(emails));
app.get('/api/emails/:id', (req, res) => {
  res.send(
    emails.find((element) => element.id === parseInt(req.params.id, 10))
  );
});

app.delete('/api/emails/:id', (req, res) => {
  let result;
  try {
    emails.splice(
      emails.indexOf(
        emails.find((element) => element.id === parseInt(req.params.id))
      ),
      1
    );
    result = {
      status: 'success',
      message: 'The message was successfully deleted',
    };
  } catch {
    result = {
      status: 'failed',
      message: 'The message was not deleted',
    };
    res.status(400);
  }
  res.json(result);
});

app.get('/api/search', (req, res) => {
  const query = decodeURIComponent(req.query.query);
  const filteredEmails = emails.filter((email) =>
    email.subject.includes(query)
  );

  res.send(filteredEmails);
});

app.post('/api/send', function (req, res) {
  let result;
  const emailSender = req.body;
  if (
    emailSender.sender &&
    emailSender.recipient &&
    emailSender.subject &&
    emailSender.message
  ) {
    emails.push({
      sender: emailSender.sender,
      recipient: emailSender.recipient,
      subject: emailSender.subject,
      message: emailSender.message,
      date: new Date(),
      id: emails[emails.length - 1].id + 1,
    });

    result = {
      status: 'success',
      message: 'The message was successfully sent',
    };
  } else {
    result = {
      status: 'failed',
      message: 'The message was not sent',
    };
    res.status(400);
  }

  res.json(result);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
