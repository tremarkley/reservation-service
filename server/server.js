const app = require('./app');
const port = process.env.port || 3002;

app.listen(port, () => console.log(`Reservation service listening on port ${port}!`));
