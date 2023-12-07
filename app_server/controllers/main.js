const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());


function setName(req) {
    let usr = getCookie(req, 'username');

    if (usr !== null) {
        if (usr.length > 0) {
            return usr;
        } else {
            return "";
        }
    }

    return "";
}

function getCookie(req, name) {
    return req.cookies[name] || null;
}

const index = function(req, res) {
   
    const usr = setName(req);

    res.render('index', { title: 'Greasy Engines', currentUsr: usr });
};

module.exports = {
    index
};
