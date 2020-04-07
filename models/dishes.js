const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

/*
{
    "name": "Uthappizza",
    "image": "images/uthappizza.png",
    "category": "mains",
    "label": "Hot",
    "price": "4.99",
    "featured": "true",
    "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
    "comments": [
        {
          "rating": 5,
          "comment": "Imagine all the eatables, living in conFusion!",
          "author": "John Lemon",
          "date": "2012-10-16T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          "author": "Paul McVites",
          "date": "2014-09-05T17:57:28.556094Z"
        },
        {
          "rating": 3,
          "comment": "Eat it, just eat it!",
          "author": "Michael Jaikishan",
          "date": "2015-02-13T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Ultimate, Reaching for the stars!",
          "author": "Ringo Starry",
          "date": "2013-12-02T17:57:28.556094Z"
        },
        {
          "rating": 2,
          "comment": "It's your birthday, we're gonna party!",
          "author": "25 Cent",
          "date": "2011-12-02T17:57:28.556094Z"
        }
    ]
}
*/

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;