
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// -------------------------------------------------------
// JWT TOKEN GENERATE KARNE KA HELPER FUNCTION
// -------------------------------------------------------
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },                    // Token mein kya store hoga
    process.env.JWT_SECRET,            // Secret key .env se
    { expiresIn: '7d' }               // Token 7 din baad expire hoga
  );
};

// -------------------------------------------------------
// SIGNUP — Naya user register karna
// POST /api/auth/signup
// -------------------------------------------------------
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Sab fields aaye hain ya nahi check karo
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // 2. Email pehle se registered hai ya nahi
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // 3. Naya user banao — password User.js ka pre('save') hook
    //    automatically hash kar dega
    const user = await User.create({ name, email, password });

    // 4. Token banao aur response bhejo
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// -------------------------------------------------------
// LOGIN — Existing user login karna
// POST /api/auth/login
// -------------------------------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Fields check karo
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // 2. Email se user dhundo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Password match karo — User.js ka matchPassword method use hoga
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 4. Token banao aur response bhejo
    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// -------------------------------------------------------
// GET PROFILE — Logged in user ki info
// GET /api/auth/profile
// -------------------------------------------------------
const getProfile = async (req, res) => {
  try {
    // req.user authMiddleware se aayega (Step 4 mein banega)
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  }  catch (error) {
    console.log('FULL ERROR:', error); // ← Ye add karo
    res.status(500).json({ message: 'Server error', error: error.message });
}
};

module.exports = { signup, login, getProfile };
