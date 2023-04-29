const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const fs = require("fs");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const contents = fs.readFileSync(__dirname + "/api_key.txt", "utf-8");
const apiKeys = contents.split("\n").reduce((result, line) => {
  const [key, value] = line.split("=");
  result[key] = value.trim();
  return result;
}, {});
const myApiKey = apiKeys["API_ID"];
const myListID = apiKeys["LIST_ID"];


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data); 

    var url = "https://us13.api.mailchimp.com/3.0/lists/"+myListID;

    const options = {
      method: "POST",
      auth: "arpan1:"+myApiKey,
    };

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.send("Successfully sbscribed!");
        }
        else {
            res.send("There was an error while signing up.");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})




app.listen("3000", function () {
    console.log("Server is running on port 3000.");
})