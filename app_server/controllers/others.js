const createUser = function(req, res){
    res.render('createUser', { title: 'Create User' });
};

const login = function(req, res){
    res.render('login', { title: 'Login' });
};

module.exports = { 
createUser,
login
};
