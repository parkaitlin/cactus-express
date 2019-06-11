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
            const allTours = await Tour.find({}).sort({eventStartDate: 1})
            res.json({
                status: 200,
                tours: allTours
            })
            
        } catch (error) {
            res.json({
                error: error
            })
        }
    },
    update: async (req, res)=>{
        try {
            const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.json({
                status: 200,
                message: "Tournament has been updated."
            })
            
        } catch (error) {
            res.json({
                error: error
            })
        }
    },
    playerRegistration: async(req, res)=>{
        try {
            const user = await User.findById(req.session.userDbId);
            const tour = await Tour.findById(req.params.id);
            user.registeredTours.push(tour._id);
            user.save();
            tour.registeredPlayers.push({_id: user._id, firstName: user.firstName, lastName: user.lastName, hometown: user.hometown, state: user.state});
            tour.save();

            res.json({
                status: 200,
                user: user,
                tour: tour
            })
        } catch (error) {
            res.json({
                error: error
            })
        }
    },
    upcomingTours: async(req, res)=>{
        const allTours = []
        try {
            const currentUser = await User.findById(req.session.userDbId)
            for(let i = 0; i < currentUser.registeredTours.length - 1; i++){
                const tour = await Tour.findById(currentUser.registeredTours[i])
                allTours.push(tour)
            }
            res.json({
                status: 200,
                allTours: allTours
            })
        } catch (error) {
            res.json({
                error: error
            })
        }
    }    
}