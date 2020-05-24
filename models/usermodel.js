const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  tasks: [{task: String, completed: Boolean}]
});

const User = mongoose.model('user',userSchema);

module.exports = User;
