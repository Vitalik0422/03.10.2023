const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth') 

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
    res.cookie('refreshToken', response.tokens.refreshToken, {maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true})
    res.json(response)
})
router.post('/logout', async (req, res, next) => {
    const {refreshToken} = req.cookies
    console.log('TOken in cook', refreshToken);
    const logoutToken = await authCtrl.logout(refreshToken)
    res.clearCookie('refreshToken')
    res.json(logoutToken)
})
router.get('/refresh', (req, res, next) => {

})


module.exports = router;