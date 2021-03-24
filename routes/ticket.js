const express = require('express');
const ticketController = require('../controllers/ticket');
const { check, body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// router.get('/getTickets/:projectId', ticketController.getTickets);

router.post('/postTicket', isAuth, [
        body('title', 'Title must be at least 5 characters and only text & numbers').isLength({ min: 5 }).isAlphanumeric().trim(),
        body('description', 'Description must be at least 10 characters').isLength({ min: 10 }).trim(),
        body('projectId', 'Is the project ID correct or missing?').trim(),
        body('userId', 'Is the user ID correct or missing?').trim()
    ], ticketController.postTicket);

//UPDATE ticket
router.put('/:postId', isAuth, [
        body('title')
        .trim()
        .isLength({ min: 5 }),
        body('description')
        .trim()
        .isLength({ min: 5 })
    ],
    ticketController.updateTicket
);

router.delete('/:postId', isAuth, ticketController.deleteTicket);
router.get('/getUserTickets', isAuth, ticketController.getUserTickets);

module.exports = router;