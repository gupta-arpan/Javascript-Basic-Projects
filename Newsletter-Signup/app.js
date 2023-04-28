const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


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

    var url = "https://us13.api.mailchimp.com/3.0/lists/17844491d9";

    const options = {
      method: "POST",
      auth: "arpan1:0cbab7fa6f87323c45d037de6b1967f9-us13",
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

//API key
//0cbab7fa6f87323c45d037de6b1967f9-us13
//list id 
//17844491d9