const cardata = function(req, res){
    res.render('car-data', {
    title: 'Cars! Find a car for you!',
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
    
    module.exports = {
        cardata
    };