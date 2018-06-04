var express = require('express');
var router = express.Router();
var db = require('../db/queries')
const { loginRequired } = require('../auth/helpers')
const passport = require('../auth/local')

//get requests ----------------------------
router.get('/', db.getAllUsers)

/* 6. getUser // GET Route = /users/getUser */
router.get('/getSingleUser', db.getSingleUser);
/* 9. logoutUser // GET Route = /users/logout */
router.get('/logout', loginRequired, db.logoutUser);

router.get('/getAllCaffeineIntake', loginRequired, db.getAllCaffeineIntake);


//post requests -----------------

/* registerUser // POST Route = /users/newuser */
router.post('/newuser',db.registerUser);

 router.post('/trackCaffeineIntake', loginRequired, db.trackCaffeineIntake)


// getting to delete intake

router.delete('/deleteCaffeine/:intake_id', loginRequired, db.removeCaffeine)

// login user 
router.post('/login', passport.authenticate('local'), (req, res) => {
  delete req.user.password_digest
  res.json(req.user);
});

module.exports = router;
