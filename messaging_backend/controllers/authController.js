const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const nodemailer = require("nodemailer");

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash, role, email_verified) VALUES ($1, $2, $3, $4, false) RETURNING *",
      [username, email, hashedPassword, role]
    );

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Mailtrap",
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
      from: '"Messaging App" <no-reply@messaging.com>',
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    });

    res.status(201).json({ message: "User registered. Check your email for verification." });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    if (result.rowCount === 0) return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    if (!user.email_verified) return res.status(403).json({ error: "Please verify your email" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
