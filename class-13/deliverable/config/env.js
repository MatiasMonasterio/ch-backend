const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_TIME_MINUTES = process.env.SESSION_TIME_MINUTES;
const MONGO_URL = process.env.MONGO_URL;

module.exports = { PORT, SESSION_SECRET, MONGO_URL, SESSION_TIME_MINUTES };
