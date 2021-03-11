const Ticket = require('../models/ticket');
const { ObjectId } = require('mongodb');

/////////////////////////////////////////////////////////////*
// GET Tickets
/////////////////////////////////////////////////////////////*
// exports.getTickets = (req, res, next) => {
//     //Find based on Project ID

//     Ticket.find({ 'projectId': req.params.projectId })
//         .then(tickets => {
//             return res.status(200).json({
//                 tickets: tickets
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(err);
//         });
// };


/////////////////////////////////////////////////////////////*
// POST Ticket /////
/////////////////////////////////////////////////////////////*
exports.postTicket = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;

    //FIXME: Get projectID, likely req.query
    const projectId = req.body.projectId;

    const userId = req.userId;

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    const ticket = new Ticket({
        title: title,
        description: description,
        projectId: projectId,
        userId: userId
    });

    return ticket.save().then(result => {
        res.status(201).json({
                message: "Ticket posted successfully"
            })
            .catch(err => console.log(err));
    }).catch(err => { console.log(err); })

};

/////////////////////////////////////////////////////////////*
// GET Tickets by User
/////////////////////////////////////////////////////////////*
exports.getUserTickets = (req, res, next) => {
    //Find based on Project ID

    Ticket.find({ 'userId': req.userId })
        .then(tickets => {
            return res.status(200).json({
                tickets: tickets
            });
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(err);
        });
};

/////////////////////////////////////////////////////////////*
// UPDATE Ticket
/////////////////////////////////////////////////////////////*
exports.updateTicket = (req, res, next) => {
    const ticketId = req.params.ticketId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const description = req.body.description;
    Ticket.findById(ticketId)
        .then(ticket => {
            if (!ticket) {
                const error = new Error('Could not find ticket.');
                error.statusCode = 404;
                throw error;
            }
            if (ticket.userId.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
            ticket.title = title;
            ticket.description = description;
            return ticket.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Ticket updated!', ticket: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

/////////////////////////////////////////////////////////////*
// DELETE Ticket
/////////////////////////////////////////////////////////////*
exports.deleteTicket = (req, res, next) => {
    const ticketId = req.params.ticketId;
    Ticket.findById(ticketId)
        .then(ticket => {
            if (!ticket) {
                const error = new Error('Could not find ticket.');
                error.statusCode = 404;
                throw error;
            }
            if (ticket.userId.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
            // Check logged in user
            return Ticket.findByIdAndRemove(ticketId);
        })
        .then(result => {
            res.status(200).json({ message: 'Deleted ticket.' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};