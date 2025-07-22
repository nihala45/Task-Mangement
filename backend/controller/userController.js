
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import otplib from 'otplib';

dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2d' });
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email, is_email_verified: true });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered and verified.' });
    }

    const otp = otplib.authenticator.generate(otplib.authenticator.generateSecret());
    console.log(otp,'otp confirming')
    const hashedPassword = await bcrypt.hash(password, 10);
   
    let user = await User.findOne({ email, is_email_verified: false });
    if (user) {
      user.username = username;
      user.password = hashedPassword;
      user.email_otp = otp;
    } else {
      user = new User({
        email,
        username,
        password: hashedPassword,
        email_otp: otp,
      });
    }

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_HOST_USER,
      to: email,
      subject: 'Email Verification OTP',
      text: `Hi ${username},\n\nYour OTP is: ${otp}\nIt is valid for 5 minutes.`,
    });

    return res.status(201).json({ msg: 'OTP sent to your email.', id: user._id });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: 'Failed to register user.' });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email_otp } = req.body;
    const { id } = req.params;

    if (!email_otp) {
      return res.status(400).json({ error: 'OTP is required' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.email_otp === email_otp) {
      user.is_email_verified = true;
      user.email_otp = null;
      await user.save();

      const access = generateToken(user._id);
      const refresh = generateRefreshToken(user._id);

      return res.status(200).json({
        message: 'OTP verified successfully!',
        access,
        refresh,
        id: user._id,
        username: user.username,
        email: user.email,
      });
    }

    return res.status(400).json({ error: 'Invalid OTP' });
  } catch (err) {
    console.error("OTP verification error:", err);
    return res.status(500).json({ error: 'Failed to verify OTP.' });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!user.is_email_verified) {
      return res.status(403).json({ error: 'Email not verified. Please verify first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const access = generateToken(user._id);
    const refresh = generateRefreshToken(user._id);

    return res.status(200).json({
      refresh,
      access,
      id: user._id,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
};
