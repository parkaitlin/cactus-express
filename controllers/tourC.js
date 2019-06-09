const Tour = require('../models/tour');
const User = require('../models/user');

module.exports = {
    addTour: async (req, res)=>{
        req.body.createdBy = req.session.userDbId
        try {
            const newTour = await Tour.create(req.body)
            res.json({
                status: 200,
                message: 'Tournament has been added to the schedule',
                tour: newTour
            })
        } catch (error) {
            res.json({
                error: error
            })
        }
    },
    index: async (req, res)=>{
        try {
            const allTours = await Tour.find({}).sort({eventId: 1})
            res.json({
                status: 200,
                tours: allTours
            })
            
        } catch (error) {
            res.json({
                error: error
            })
        }
    }    
}