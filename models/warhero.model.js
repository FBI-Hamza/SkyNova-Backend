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

<<<<<<< HEAD
module.exports =  mongoose.model('warHero', warHeroSchema);
=======
module.exports = mongoose.model('warhero', warHeroSchema);
>>>>>>> bfb154fcbb6a9647c28b897f71f30868caf64956
