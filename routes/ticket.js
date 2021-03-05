const express = require('express');
const ticketController = require('../controllers/ticket');
const { check, body } = require('express-validator/check');
// const isAuth = require('../middleware/is-auth'); //TODO: Set this up for later

const router = express.Router();

router.get('/getTickets/:projectId', ticketController.getTickets);

router.post('/postTicket', [

    body('title','Title must be at least 5 characters and only text & numbers').isLength({min: 5}).isAlphanumeric().trim(),
    body('description', 'Description must be at least 10 characters').isLength({min:10}).trim(),
    body('projectId', 'Is the project ID correct or missing?').trim(),
    body('userId', 'Is the user ID correct or missing?').trim()

], ticketController.postTicket);

module.exports = router;