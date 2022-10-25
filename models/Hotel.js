const { Schema, model, Types } = require('mongoose');

const URL_PATTERN= /^https?:\/\/.+$/i;
 
const hotelSchema = new Schema({
    name: { type: String, required: true, unique: true, min: [4, 'Hotel name must be at least 4 characters long.'] },
    city: { type: String, required: true, min: [3, 'Rooms must be at least 3 characters long.'] },
    imageUrl: {type: String, required: true, validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Image URL is not valid'
    }},
    rooms: { type: String, required: true, min: [1, 'Rooms must be between 1 and 100'], max: [1, 'Rooms must be between 1 and 100'] },
    bookings: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});

hotelSchema.index({name: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;