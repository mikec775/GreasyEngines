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

const cardata = function(req, res){
    
    const usr = setName(req);

    res.render('car-data', {
    title: 'Cars! Find a car for you!',
    currentUsr: usr,
    pageHeader: { 
    title: 'Cars!', 
    strapline: 'Find the perfect car for you!' 
    },
    cars: [{ 
        brand: "Tesla",
        modelname: "Roadster",
        type: "Sports",
        engine: "Electric",
        seats: "Number of seats: 5",
        seattype: "Leather seats",
        miles: "100 miles",
        rating: "65 score",
    },{ 
        brand: "Tesla",
        modelname: "Model X",
        type: "Sports",
        engine: "Electric",
        seats: "Number of seats: 5",
        seattype: "Leather seats",
        miles: "100 miles",
        rating: "65 score",
        },{ 
            brand: "Tesla",
        modelname: "Model S",
        type: "Sports",
        engine: "Electric",
        seats: "Number of seats: 5",
        seattype: "Leather seats",
        miles: "100 miles",
        rating: "65 score",
            }
    ]});
    
};  

const carinfo = function(req, res){
    
    const usr = setName(req);

    res.render('car-info', {
    title: 'Tesla Roadster',
    currentUsr: usr,
    pageHeader: { 
    title: 'Tesla', 
    strapline: 'Find the perfect tesla for you!' 
    },
    cars: [{ 
        brand: "Tesla",
        price: "100,000",
        modelname: "Roadster",
        type: "Sports",
        engine: "Electric",
        seats: "Number of seats: 5",
        seattype: "Leather seats",
        miles: "100 miles",
        rating: "65 score",
        text:"The brand-new Tesla Roadster is a true marvel in the world of sports cars. Priced at €100,000, this electric beauty is a testament to Tesla's commitment to innovation and sustainability. The Roadster boasts a sleek design that's sure to turn heads wherever it goes. With its powerful electric engine, it not only offers an exhilarating driving experience but also contributes to a greener planet. Inside, you'll find comfortable leather seats, ensuring a luxurious and enjoyable ride for all passengers. The vehicle's impressive range of 100 miles on a single charge means you can embark on exciting journeys with confidence. Moreover, it has received a remarkable rating of 65, reflecting its exceptional performance and cutting-edge technology. The Tesla Roadster is the embodiment of luxury, eco-friendliness, and high performance, making it a top choice for those who demand the best in the world of sports cars."
    }]})};
      

    module.exports = {
        cardata,
        carinfo
    };