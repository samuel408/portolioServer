const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port =  process.env.PORT || 50000;

const corsOptions = {
    origin:  process.env.REACT_APP_SERVER_URL||'https://sleepy-sierra-38019-875c43c0002d.herokuapp.com/',
  };
  
  app.use(cors(corsOptions));
  app.use(bodyParser.json());

app.post("/api/contact", (req, res) => {
    console.log('Received a POST request to / from:', req.get('origin'));

  const { name, email, message } = req.body;

  // Use nodemailer to send an email
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'samuel14082023@outlook.com', // Your email address
      pass: 'Samuel408!', // Your Gmail password or App Password
    },
  });

  const mailOptions = {
    from: 'samuel14082023@outlook.com',
    to: 'samuelwebsiteemails@gmail.com', // The email address where you want to receive form submissions
    subject: 'New Website Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Email sent: ' + info.response);
  });

  res.json({ message: 'Form submitted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
