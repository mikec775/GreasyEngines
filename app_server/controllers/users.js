const createUser = function(req, res){
    res.render('createUser', { title: 'Create User' });
};

const login = function(req, res) {
    res.render('login', { title: 'Login' });
};

const users = function(req, res){
    res.render('users', { title: 'Users' });
};

const register = function(req, res){
    res.render('register', { title: 'Register' });
};


module.exports = { 
createUser,
login,
users,
register
};
