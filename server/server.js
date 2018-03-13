const app = require('./app');

const port = process.env.port || 3008;

app.listen(port, () => console.log(`Reservation service listening on port ${port}!`));
