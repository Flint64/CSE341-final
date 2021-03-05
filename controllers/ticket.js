const Ticket = require('../models/ticket');
const { ObjectId } = require('mongodb');


/////////////////////////////////////////////////////////////*
// GET Tickets
/////////////////////////////////////////////////////////////*
exports.getTickets = (req, res, next) => {
    //Find based on Project ID

    Ticket.find({ 'projectId': req.params.projectId })
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
// POST Ticket
/////////////////////////////////////////////////////////////*
exports.postTicket = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;

    //FIXME: Get projectID, likely req.query
    const projectId = req.body.projectId;

    //FIXME: Get the userID, likely req.session
    const userId = req.body.userId;

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