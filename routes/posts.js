const express = require('express');
const router = express.Router();

const passport = require('../config/passport-local-strategy');

const postsController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postsController.create);
router.get('/delete/:id',passport.checkAuthentication,postsController.destroy);

module.exports = router;