/* GET home page */
const index = function(req, res){ 
res.render('index', { title: 'Greasy Engines' }); 
};
module.exports = { 
index 
};
