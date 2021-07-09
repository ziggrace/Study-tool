const models = require("../models/stateModel")

stateController = {}

stateController.getState = (req, res, next) => {
    models.findOne({user: req.query.user}).then((state)=>{
        res.locals = state
        console.log(res.locals)
        return next()
    }).catch((err)=> {return next(err)})
}

stateController.postState = (req, res, next) => {
    console.log("REQ BODY: " + JSON.stringify(req.body))
    models.create(req.body).then((created)=>{
        return next()
    }).catch((err)=>{return next(err)})
}

stateController.updateState = (req, res, next) => {
    models.updateOne(req.query, req.body).then((added)=>{
        return next()
    }).catch((err)=> {return next('Updated user not found' + err)})
}

module.exports = stateController;
