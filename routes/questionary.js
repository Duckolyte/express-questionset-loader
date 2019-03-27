var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/questionary/:id', function(req, res, next) {
  const id = req.params.id;
  console.log(req)
  res.send(
    {
      questionaryId: id,
      key: 'value'
    }
  )
});

router.post('/questionary', function(req, res, next) {
  
});

module.exports = router;
