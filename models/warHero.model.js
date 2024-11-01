var mongoose = require("mongoose");

var warHeroSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    accomplishments:{
        type: String,
        required: false
    },
    medals:{
        type: String,
        required: false
    },
    movies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'WingsOfGloryResource',
        required: false
    }],
    documentaries:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'WingsOfGloryResource',
        required: false
    }],    
    quotes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'WingsOfGloryResource',
        required: false
    }],
  
});

module.exports =  mongoose.model('warHero', warHeroSchema);
