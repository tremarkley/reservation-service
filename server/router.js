const express = require('express');
const bodyparser = require('body-parser');
const reservations = require('../db/controllers/reservations');

const router = express.Router();

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

router.get('/:id', (req, res) => {
  reservations.getReservationDataForMonth(req.params.id, req.body.month, req.body.year)
    .then((reservationsObj) => {
      res.send(reservationsObj);
    })
    .catch((err) => {
      res.send(500, err);
    });
});

router.put('/:id', (req, res) => {
  res.send('thanks for putting');
});

module.exports = router;
