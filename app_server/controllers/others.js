const createUser = function(req, res){
    res.render('createUser', { title: 'Create User' });
};

const login = function(req, res) {
    res.render('login', { title: 'Login' });
};


const cars = function(req, res){
    res.render('cars', { title: 'Cars' });
};

module.exports = { 
createUser,
login,
cars
};
