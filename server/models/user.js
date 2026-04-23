
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,                          // Extra spaces hatao
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [30, 'Name cannot exceed 30 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,                        // Duplicate email allowed nahi
      lowercase: true,                     // Hamesha lowercase mein save hoga
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  {
    timestamps: true,   // createdAt aur updatedAt automatically add hoga
  }
);

// -------------------------------------------------------
// PASSWORD HASHING — Save karne se PEHLE chalta hai
// -------------------------------------------------------
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// -------------------------------------------------------
// PASSWORD CHECK METHOD — Login ke time use hoga
// -------------------------------------------------------
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);