import PropTypes from 'prop-types';

const dateShape = PropTypes.shape({
  listing_id: PropTypes.number.isRequired,
  minimum_stay: PropTypes.number.isRequired,
  maximum_guests: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
});

export default dateShape;
