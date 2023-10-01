
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})


app.post("/", function (req, res) {

    const long = req.body.longitude;
    const lat = req.body.latitude;
    const appid = "886705b4c1182eb1c69f28eb8c520e20";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + appid + "&units=metric";

    https.get(url, function (responce) {
        console.log(responce.statusCode);

        responce.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img//wn/" + icon + "@2x.png"
            // res.write("<h1>The Temparature at   Latitude: "+lat+" and    Longitude: "+long+" is <br>" + temp + " degree Celcius</h1>");
            // res.write("<p>The weather is currently " + weatherDescription + "</p>");
            // res.write("<img src=" + imageUrl + ">");
            // res.send();

            // res.write("<h1 style='color: blue;font-family: Arial, sans-serif;align:center;'>The Temperature at Latitude: " + lat + " and Longitude: " + long + " is <br>" + temp + " degree Celsius</h1>");
            // res.write("<p style='font-size: 20px;'>The weather is currently " + weatherDescription + "</p>");
            // res.write("<img src=" + imageUrl + ">");
            // res.send();

            // res.write("<div style='display: flex; flex-direction: column; align-items: center;'>");
            // res.write("<h1 style='color: blue;'>The Temperature at Latitude: " + lat + " and Longitude: " + long + " is <br>" + temp + " degree Celsius</h1>");
            // res.write("<p style='font-size: 20px;'>The weather is currently " + weatherDescription + "</p>");
            // res.write("<img src=" + imageUrl + ">");
            // res.write("</div>");
            // res.send();

            res.write("<div style='display: flex; justify-content: center; align-items: center; height: 100vh;background-color: #e0e2e4;'>");
            res.write("<div style='text-align: center;'>");
            res.write("<h1 style='color: blue;font-family: Times New Roman, Times, serif;font-size : 40px;'>The Temperature at Latitude: " + lat + " and Longitude: " + long + " is <br>" + temp + " degree Celsius</h1>");
            res.write("<p style='font-size: 20px;font-family: Arial, sans-serif;font-size:25px;'>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src=" + imageUrl + ">");
            res.write("</div>");
            res.write("</div>");
            res.send();


        })
    })
})



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})