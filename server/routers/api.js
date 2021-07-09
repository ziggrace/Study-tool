const express = require("express");

const stateController = require("../controllers/stateController")
console.log(stateController)

const router = express.Router();


router.get('/', stateController.getState, function(req, res) {
    res.status(200).json(res.locals)
});

router.post('/', stateController.postState, function(req, res){
    console.log(req.body)
    res.status(200).send('successfully posted')
})

router.put('/', stateController.updateState, function(req, res){
    res.status(200).send('successfully posted')
})

module.exports = router;