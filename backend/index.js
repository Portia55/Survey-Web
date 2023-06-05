const express = require("express");
const app = express();
const mongoose = require("mongoose");
const SurveyModel = require('./models/Responses');
const cors = require('cors');


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://portia123:217008734Mm@cluster0.zp8xhqi.mongodb.net/surveydb?retryWrites=true&w=majority");

app.get("/getResponse", async (req,res) => {
   await SurveyModel.find().then((err, result) => {
  if(err)
  {
    res.json(err);
  }
  else{
    res.json(result);
  }
  });
});


app.post("/postResponse", async (req,res) => {
  const surveyData = req.body;
  const newSurveyData = new SurveyModel(surveyData);
  await newSurveyData.save();

  res.json(surveyData);
});


app.listen(3001, ()=> {
console.log("server runs on port 3001");
});


