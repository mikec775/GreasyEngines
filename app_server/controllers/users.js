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


const createUser = function(req, res){
    const usr = setName(req);
    res.render('createUser', { title: 'Create User', currentUsr: usr });
};

const login = function(req, res) {
    const usr = setName(req);
    res.render('login', { title: 'Login', currentUsr: usr  });
};

const users = function(req, res){
    const usr = setName(req);
    res.render('users', { title: 'Users', currentUsr: usr  });
};

const register = function(req, res){
    const usr = setName(req);
    res.render('register', { title: 'Register', currentUsr: usr  });
};


module.exports = { 
createUser,
login,
users,
register
};
