const Questionary = require('../model/questionary.js');

//Create new Product
exports.create = (req, res) => {

    console.log('try to create body: ')
    console.log(req.body);

    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Questionary content can not be empty"
        });
    }

    // Create a Product
    const product = new Questionary({
        title: req.body.title,
        author: req.body.author,
        type: req.body.type,
        questions: req.body.questions
    });

    // Save Product in the database
    product.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the questionary."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Questionary.find()
    .then(questionaries => {
        res.send(questionaries);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving questionaries."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Questionary.findById({ _id: req.params.id })
    .then(questionary => {
        if(!questionary) {
            return res.status(404).send({
                message: "Questionary not found with id " + req.params.id
            });
        }
        res.send(questionary);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Questionary not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving questionary with id:" + req.params.id
        });
    });
};

// Update a questionary
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Questionary content can not be empty"
        });
    }

    // Find and update product with the request body
    Questionary.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        type: req.body.type,
        questions: req.body.questions
    }, {new: true})
    .then(questionary => {
        if(!questionary) {
            return res.status(404).send({
                message: "Questionary not found with id:" + req.params.id
            });
        }
        res.send(questionary);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Questionary not found with id:" + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id:" + req.params.id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Questionary.findByIdAndRemove(req.params.id)
    .then(questionary => {
        if(!questionary) {
            return res.status(404).send({
                message: "Questionary not found with id: " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Questionary not found with id: " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Questionary with id: " + req.params.id
        });
    });
};
