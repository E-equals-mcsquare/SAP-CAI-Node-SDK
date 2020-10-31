/**
 * Author: Souvik Majumder
 * Dated: 30-10-2020
 */

/**
 * Importing all required modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
var FormMessages = require('./formMessages');

var formMessages = new FormMessages();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.static('public'));

/**
 * Making HTTP Requests to/from external server with Node.js
 */

// Performing GET Requests
app.get('/SampleGetExternalServer', async function (req, res) {

    let backendData = [];
    var config = {
        method: 'get',
        url: 'https://services.odata.org/Experimental/OData/OData.svc/Products',
        headers: {}
    };

    await axios(config)
        .then(function (response) {
            backendData = (response.data);
        })
        .catch(function (error) {
            res.send(error);
        });

    /**
     * Single Message Strip Reply
    */

    /*
    var productsList = "";
    for (let i = 0; i < allProducts.length; i++) {
        productsList = productsList + allProducts[i].ID + "\n" + allProducts[i].Name + "\n\n";
    }

    res.send(setTextResponseSingle(productsList,''));
    */

    /**
     * Multiple Message Strips Reply
     */

    var allProducts = backendData.value;
    var replies = [];
    for (let i = 0; i < allProducts.length; i++) {
        replies.push({
            "type": "text",
            "content": allProducts[i].ID + "\n" + allProducts[i].Name
        });
    }

    res.send(setTextResponseMultiple(replies, ''));

});

function setTextResponseSingle(text, memory) {
    return formMessages.textResponseSingle(text, memory);
}

function setTextResponseMultiple(repliesArray, memory) {
    return formMessages.textResponseMultiple(repliesArray, memory);
}

function setImageResponse(imageUrl, memory) {
    return formMessages.image(imageUrl, memory);
}

function setButtonResponse(title, buttons, memory) {
    return formMessages.buttonReplies(title, buttons, memory);
}

function setQuickRepliesResponse(title, buttons, memory) {
    return formMessages.quickReplies(title, buttons, memory);
}



app.listen(port, () => {
    console.log('Server running on port: ' + port);
});

