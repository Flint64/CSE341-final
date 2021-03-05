const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  //created time stamp?
  //Last updated timestamp?
  //priority level ? low/medium/high
  //Status New/Open/In-progress/resolved/additional info required
  //ticket type error/bug
});

module.exports = mongoose.model('Ticket', ticketSchema);