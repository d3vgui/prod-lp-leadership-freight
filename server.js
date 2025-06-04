const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const https = require("https");
const fs = require("fs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.get("/api", (req, res) => {
  res.send("Back-end está funcionando!");
});

app.post("/send-email", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: true,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Novo contato: ${subject}`,
    html: `
      <h3>Você recebeu uma nova mensagem do site</h3>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Assunto:</strong> ${subject}</p>
      <p><strong>Mensagem:</strong><br>${message}</p>
      <br>
      <img src="cid:imgEmail" alt="Leadership Freight" style="width: 200px; height: auto;">
    `,
    attachments: [
      {
        filename: "logo-email.png",
        path: path.join(__dirname, "images", "logo-email.png"),
        cid: "imgEmail",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({ error: "Erro ao enviar email." });
  }
});

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/lfgex.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/lfgex.com/fullchain.pem"),
};

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

