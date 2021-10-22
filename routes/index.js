//any route that isn't followed by something will be here
const express = require('express')

//creating router
const router = express.Router()

//description on the routers

//@desc Login/LandingPage
//@route GET/
router.get('/', (req, res) =>{ //creating get request for login
    res.render('login', {
        layout: 'login-layout'
    })
})

//@desc Dashboard
//@route GET /dashboard
router.get('/dashboard', (req, res) =>{ //creating get request for dashboard
    res.render('dashboard')
})

module.exports = router
