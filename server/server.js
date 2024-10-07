const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

// const dbConfig = require("./app/config/db.config");
const dotenv = require("dotenv");
dotenv.config();

const db_uri = process.env.DB_URI;
const cookie_secret = process.env.COOKIE_SECRET;

const app = express();

var corsOptions = {
  origin: "https://no-due-ksriet.netlify.app",
  credentials: true,
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "nodue-session",
    secret: cookie_secret, // should use as secret environment variable
    httpOnly: true,
  })
);

const db = require("./app/models");
const { ErrorMiddleware } = require("./app/middlewares/error");
const Role = db.role;

db.mongoose
  // .connect(`${dbConfig.HOST}/${dbConfig.DB}`, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  .connect(`${db_uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend." });
});

// routes
require("./app/routes/faculty.routes")(app);
require("./app/routes/student.routes")(app);
// require("./app/routes/hod.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/courses.routes")(app);
require("./app/routes/requests.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.use(ErrorMiddleware);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "student",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'student' to roles collection");
      });

      // new Role({
      //   name: "hod"
      // }).save(err => {
      //   if (err) {
      //     console.log("error", err);
      //   }

      //   console.log("added 'hod' to roles collection");
      // });

      new Role({
        name: "faculty",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'faculty' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
