const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = 5000;

// middleware
app.use(express.json());
app.use(cors());

app.listen(port, () => {
 console.log(`Server is running on port: ${port}`);
});

let transporter = nodemailer.createTransport( {
	host: 'smtp-mail.outlook.com',
	port: 587,
	secure: false,
	proxy: false,
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.USER_PASS
	}
});

transporter.verify((err, success) => {
	err
	  ? console.log(err)
	  : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
	let emailOptions = {
		from: process.env.USER_EMAIL,
		to: 'abrantes.dev@protonmail.com',
		subject: `Contact form ${req.body.mailerState.name}`,
		html: `<html><p><strong>Name: </strong><br></br>${req.body.mailerState.email}</p><p><strong>Message: </strong><br></br>${req.body.mailerState.message}<p/></html>`
	};

	transporter.sendMail(emailOptions, function (err, data) {
		if (err) {
			console.log("Error " + err);
			res.json({
				status: "fail",
			});
		} else {
			console.log("Email sent successfully");
			res.json({
				status: "success",
			});
		}
	});
});