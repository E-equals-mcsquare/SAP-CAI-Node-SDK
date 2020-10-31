
function FormMessages() {

}

/**
 *********************************** Single Message Strip ********************************
 */
FormMessages.prototype.textResponseSingle = function (response_text, memory) {
    if (memory != '') {
        response_output = { "replies": [{ "type": "text", "content": response_text }], "conversation": { "memory": memory } }
    }

    else {
        response_output = {
            "replies": [{
                "type": "text",
                "content": response_text
            }]
        }
    }

    return response_output;
};

/*******************************************************************************************/
/**
 ********************************** Multiple Message Strips ********************************
 */
FormMessages.prototype.textResponseMultiple = function (replies_array, memory) {
    if (memory != '') {
        response_output = { "replies": replies_array, "conversation": { "memory": memory } }
    }

    else {
        response_output = {
            "replies": replies_array
        }

    }

    return response_output;
};

/*******************************************************************************************/
/**
 ********************************** Quick Replies ********************************
 */
FormMessages.prototype.quickReplies = function (title, buttons, memory) {

    var buttonsArray = [];
    for (let i = 0; i < buttons.length; i++) {
        buttonsArray.push({
            title: buttons[i],
            value: buttons[i]
        });
    }

    if (memory != '') {
        response_output = {
            "replies": [{
                "type": "quickReplies",
                "content": {
                    "title": title,
                    "buttons": buttonsArray
                }
            }], "conversation": { "memory": memory }
        }
    }

    else {
        response_output = {
            "replies": [{
                "type": "quickReplies",
                "content": {
                    "title": title,
                    "buttons": buttonsArray
                }
            }]
        }

    }

    return response_output;
};

/*******************************************************************************************/
/**
 ********************************** Buttons ********************************
 */
FormMessages.prototype.buttonReplies = function (title, buttons, memory) {

    var buttonsArray = [];
    for (let i = 0; i < buttons.length; i++) {
        buttonsArray.push({
            title: buttons[i],
            value: buttons[i],
            "type": "postback"
        });
    }

    if (memory != '') {
        response_output = {
            "replies": [{
                "type": "buttons",
                "content": {
                    "title": title,
                    "buttons": buttonsArray
                }
            }], "conversation": { "memory": memory }

        }
    }

    else {
        response_output = {
            "replies": [{
                "type": "buttons",
                "content": {
                    "title": title,
                    "buttons": buttonsArray
                }
            }]
        }
    }

    return response_output;
};

/*******************************************************************************************/
/**
 ********************************** Image ********************************
 */
FormMessages.prototype.image = function (image_url, memory) {
    if (memory != '') {
        response_output = { "replies": [{ "type": "picture", "content": image_url }], "conversation": { "memory": memory } }
    }

    else {
        response_output = {
            "replies": [{
                "type": "picture",
                "content": image_url
            }]
        }
    }

    return response_output;
};

/*******************************************************************************************/

module.exports = FormMessages;