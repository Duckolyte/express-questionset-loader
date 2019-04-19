const express = require('express');
const questionaries = require('../controller/questionary.js')
const questions = require('../controller/question.js')
const router = express.Router();


// Create a new questionary
router.post('/questionaries', questionaries.create);

// Retrieve all questionaries
router.get('/questionaries', questionaries.findAll);

// Retrieve a single questionary with id
router.get('/questionaries/:id', questionaries.findOne);

// Update a questionary with id
router.put('/questionaries/:id', questionaries.update);

// Delete a questionary with id
router.delete('/questionaries/:id', questionaries.delete);


router.post('/questions', questions.create);

router.get('/questions/:id', questions.findOne);

router.put('/questions/:id', questions.update);

module.exports = router;
