//routes for authentication 
const express = require('express')

//creating router
const router = express.Router()

//bringing in passport
const passport = require('passport')


//authenticate using google strategy
//@desc Auth with Google
//@route GET/ auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile'] }))


//call back for getting google authentication

//@desc Google auth callback
//@route GET /auth/google/callback
router.get(
    '/google/callback', passport.authenticate('google', {
    failureRedirect: '/'}), 

    //if function is successful, redirect to dashboard
    (req, res) => {
        res.redirect('/dashboard')
    }
)

//@desc Logout user
//@route /auth/logout

module.exports = router
 