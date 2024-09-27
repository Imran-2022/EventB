const Joi = require('joi');
const { Schema, model } = require('mongoose');
const eventSchema = new Schema({
    userId:Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    date: {
        type: Date,
        required: true,
        default:Date.now
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
});

const validateEvent = (event) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(5).max(1024).required(),
        date: Joi.date().required(),
        time: Joi.string().required(),
        location: Joi.string().min(5).max(255).required()
    });
    return schema.validate(event);
};

module.exports.Event = model('Event', eventSchema);
module.exports.validateEvent = validateEvent;
