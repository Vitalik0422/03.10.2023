const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth') 
const onlyAuth = require('./mw/onlyAuth')

router.post('/registration', async(req, res, next)=> {
    const {email, password} = req.body;
    const response = await authCtrl.registration(email, password)
    if(response === 500){
        res.json('Такий користувач існує')
        return
    }
    console.log(response);
    //res.cookie('refreshToken', response.tokens.refreshToken, {maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true})
    res.json(response)
})
router.post('/login', async (req, res, next) => {
    console.log(req.body);
    const {email, password} = req.body
    const response = await authCtrl.login(email, password)
    if(response === 501){
        res.json({payload:'Такого користувача не існує'})
        return
    } else if(response === 502) {
        res.json({payload: 'Пароль не вірний'})
        return
    }
    console.log('in login', response);
    res.cookie('refreshToken', response.refreshToken, {maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true})
    res.json(response)
})
router.post('/logout', async (req, res, next) => {
    const {refreshToken} = req.cookies
    const logoutToken = await authCtrl.logout(refreshToken)
    res.clearCookie('refreshToken')
    res.json(logoutToken)
})
router.get('/refresh', async(req, res, next) => {
    const {refreshToken} = req.cookies
    const response = await authCtrl.refresh(refreshToken)
    if(response){}
    res.cookie('refreshToken', response.tokens.refreshToken, {maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true})
    res.json()
})

router.get('/getUser',onlyAuth, async(req,res,next)=> {
    res.json('WORK')
})


module.exports = router;