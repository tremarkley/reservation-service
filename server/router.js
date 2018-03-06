const express = require('express');
const bodyparser = require('body-parser');
const reservations = require('../db/controllers/reservations');

const router = express.Router();

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

router.get('/:id', (req, res) => {
  console.log(`req.body: ${JSON.stringify(req.query)}`);
  reservations.getReservationDataForMonth(req.params.id, req.query.month, req.query.year)
    .then((reservationsObj) => {
      res.send(reservationsObj);
    })
    .catch((err) => {
      res.send(500, err);
    });
});

router.put('/:id', (req, res) => {
  reservations.makeReservation(req.params.id, req.body.checkInDate, req.body.checkOutDate)
    .then((price) => {
      res.send({ price });
    })
    .catch((err) => {
      res.send(500, err);
    });
});

module.exports = router;
