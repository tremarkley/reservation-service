const express = require('express');
const bodyparser = require('body-parser');

const router = express.Router();

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

router.get('/:id', (req, res) => {
  res.send('get request received!');
});

router.put('/:id', (req, res) => {
  res.send('thanks for posting');
});

module.exports = router;
