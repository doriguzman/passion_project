// const pgp = require("pg-promise")({});
// const db = pgp("postgres://localhost/caffeine");
// const authHelpers = require("../auth/helpers");
// const passport = require("../auth/local");

var pgp = require('pg-promise')({});
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

// Information on all users
const getAllUsers = (req, res, next) => {
  db
    .any("SELECT * FROM users")
    .then(data => {
      console.log("data:", data);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all users"
      });
    })
    .catch(err => {
      return next(err);
    });
};

// Get a user by user id

const getSingleUser = (req, res, next) => {
  db
    .one("SELECT * FROM Users WHERE id=${id}", {
      id: req.user.id
    })
    .then(data => {
      res.status(200).json({
        status: "success",
        user: data,
        message: "Retrieved user info"
      });
    })
    .catch(err => {
      res.status(500).send(`error getting user: ${err}`);
      return next(err);
    });
};

const getAllCaffeineIntake = (req, res, next)=>{
    db
    .any('SELECT * FROM intake WHERE user_id=${user_id}', {
      user_id: req.user.id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        apps: data,
        message: 'Retrieved all caffeine logs for user'
      });
    })
    .catch(err => {
        res.status(500).json({
          status: "Error getting all caffeine log for user",
          error: err,
          errStack: err.stack
        });

})
}

const registerUser = (req, res, next) => {
  console.log(req.body);
  let hash = authHelpers.createHash(req.body.password);
  db
    .none(
      "INSERT INTO Users ( first_name, username,  password_digest, photo_url) VALUES ($1, $2, $3, $4)",
      [req.body.firstName, req.body.username, hash, req.body.photo_url]
    )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Registration successful"
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "Error",
        error: err,
        errStack: err.stack
      });
    });
};

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).json({
    status: "success",
    message: "Logged out user"
  });
};

const trackCaffeineIntake = (req, res, next) => {
  db
    .none(
      "INSERT INTO Intake (user_id, brand, beverage, size, caffeine, intake_date, intake_time, sleep, mood) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        req.user.id,
        req.body.brand,
        req.body.beverage,
        req.body.size,
        req.body.caffeine,
        req.body.intake_date,
        req.body.intake_time, 
        req.body.sleep, 
        req.body.mood
      ]
    )
    .then(data => {
      console.log('returned ', data )
      res.status(200).json({
        status: "Success",
        data: data,
        message: "succesfully logged intake"
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "Error in logging caffeine",
        error: err,
        errStack: err.stack
      });
    });
};


function removeCaffeine(req, res, next) {
  console.log("attempting to remove caffeine");
  db
    .none("DELETE FROM Intake WHERE intake_id=${intake_id}", {
      intake_id:req.params.intake_id, 
      
    })
    .then(() => {
      res.status(200).send("removed intake");
    })
    .catch(err => res.status(500).send("error retrieving one bucketlist"));
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  registerUser: registerUser,
  logoutUser: logoutUser,
  trackCaffeineIntake: trackCaffeineIntake, 
  getAllCaffeineIntake:getAllCaffeineIntake, 
  removeCaffeine:removeCaffeine,
};
