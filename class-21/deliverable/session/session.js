const session = require("express-session");
const MongoStore = require("connect-mongo");
const {
  MONGO_URL,
  SESSION_SECRET,
  SESSION_TIME_MINUTES,
} = require("../config/env");

module.exports = session({
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * SESSION_TIME_MINUTES },
});
