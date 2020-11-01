var express = require('express')
var router = express.Router()
const {signout, signup, signin, isSignedIn}  = require("../controllers/auth")
const { check , validationResult } = require('express-validator');
const user = require('../models/user');
const { body } = require('express-validator');



router.post("/signup", [

    check("name", "Name should be atleast 3 Characters").isLength({min: 3}),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 6 char").isLength({min : 6}),

],signup)

router.post("/signin", [

    check("email", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({min : 6}),

],signin)




router.get("/signout", signout)

router.get("/testroute",  isSignedIn, (req,res) => {
        res.json(req.auth)
} )

module.exports = router;