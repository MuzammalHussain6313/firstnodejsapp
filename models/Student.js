const mongoose = require('mongoose');
const Student = mongoose.Schema({
   name: {
       type: String, required: true
   },
    email: {
       type: String, required: true
    },
   student_id: {
      type: String, required: true }
});

module.exports = mongoose.model('students', Student);
