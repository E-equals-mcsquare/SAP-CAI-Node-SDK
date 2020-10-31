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
const port = 8000;

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

    res.send(formMessages.textResponseSingle(productsList,''));
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

    res.send(formTextResponseMultiple(replies, ''));

});

function formTextResponseSingle(text, memory) {
    return formMessages.textResponseSingle(text, memory);
}

function formTextResponseMultiple(repliesArray, memory) {
    return formMessages.textResponseMultiple(repliesArray, memory);
}

function formImageResponse(imageUrl, memory) {
    return formMessages.image(imageUrl, memory);
}

function formButtonResponse(title, buttons, memory) {
    return formMessages.buttonReplies(title, buttons, memory);
}

function formQuickRepliesResponse(title, buttons, memory) {
    return formMessages.quickReplies(title, buttons, memory);
}



app.listen(port, () => {
    console.log('Server running on port: ' + port);
});

