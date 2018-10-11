var EventModel = require('../models/EventModel.js');
const helpers = require('../helpers/helpers.js')

/**
 * EventController.js
 *
 * @description :: Server-side logic for managing Events.
 */
module.exports = {

    /**
     * EventController.list()
     */
    list: function (req, res) {
        EventModel.find(function (err, Events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Event.',
                    error: err
                });
            }
            return res.json(Events);
        });
    },

    /**
     * EventController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        EventModel.findOne({
            _id: id
        }, function (err, Event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Event.',
                    error: err
                });
            }
            if (!Event) {
                return res.status(404).json({
                    message: 'No such Event'
                });
            }
            return res.json(Event);
        });
    },

    /**
     * EventController.create()
     */
    create: function (req, res) {

        let userId = helpers.decodeToken(req.headers.access_token).id

        var Event = new EventModel({
            name: req.body.name,
            location: req.body.location,
            address: req.body.address,
            user: userId

        });



        Event.save(function (err, Event) {
            if (err) {
                return res.status(500).json(Event);
            }
            return res.status(201).json(Event);
        });
    },

    /**
     * EventController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        EventModel.findOne({
            _id: id
        }, function (err, Event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Event',
                    error: err
                });
            }
            if (!Event) {
                return res.status(404).json({
                    message: 'No such Event'
                });
            }

            Event.name = req.body.name ? req.body.name : Event.name;
            Event.location = req.body.location ? req.body.location : Event.location;
            Event.address = req.body.address ? req.body.address : Event.address;
            Event.user = req.body.user ? req.body.user : Event.user;

            Event.save(function (err, Event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Event.',
                        error: err
                    });
                }

                return res.json(Event);
            });
        });
    },

    /**
     * EventController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        EventModel.findByIdAndRemove(id, function (err, Event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Event.',
                    error: err
                });
            }
            return res.status(204).json({

                "success": true,
                "message": `Event with id ${id} deleted`

            });
        });
    }
};