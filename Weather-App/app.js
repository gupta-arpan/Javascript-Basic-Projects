const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const appId = "47d025511f093a86c7a3ea3a253663de";
    const units = "metric";
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+units;
    https.get(url, function (response) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const feels_like = weatherData.main.feels_like;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL =
          "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently " + description + "</p>");
        res.write(
          "<h4>The temperature of "+query+" is " + temp + " degree Clcius.</h4>"
        );
        res.write("<img src=" + imageURL + ">");
        res.send();
      });
    });
})


app.listen("3000", function () {
    console.log("Server started at localhost 3000.");
})