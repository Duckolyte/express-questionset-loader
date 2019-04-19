const Question = require('../model/question.js');

//Create new Product
exports.create = (req, res) => {

    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Question content can not be empty"
        });
    }

    // Create a Product
    const product = new Question({...req.body});

    // Save Product in the database
    product.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the question."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Question.find()
    .then(questions => {
        res.send(questions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving questionaries."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Question.findById({ _id: req.params.id })
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "Question not found with id " + req.params.id
            });
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Question not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving question with id:" + req.params.id
        });
    });
};

// Update a question
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Questionary content can not be empty"
        });
    }

    //const questionToUpdate = new Question({...req.body})
    //delete questionToUpdate._id
    console.log('request body incoming ...');
    console.log(req.body);

    // Find and update product with the request body
    Question.findByIdAndUpdate(
      req.params.id,
      {...req.body},
      {new: true}
    )
    .then(question => {
      console.log(question);
        if(!question) {
            return res.status(404).send({
                message: "Question not found with id:" + req.params.id
            });
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Question not found with id:" + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id:" + req.params.id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Question.findByIdAndRemove(req.params.id)
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "Question not found with id: " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Question not found with id: " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Question with id: " + req.params.id
        });
    });
};
