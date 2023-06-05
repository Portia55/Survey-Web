const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
checkboxOptions: [
    {
     type: String,
     required: true,
    },
],
radioOption: {
    type: String,
    required: true,
},
textOption: {
    type: String
},
rating: {
    type: String,
    required: true,
    min: 1,
    max: 5,
},
dropdownOption: {
    type: String,
    required: true,
},


});

const SurveyModel = mongoose.model("responses", SurveySchema);
module.exports = SurveyModel;