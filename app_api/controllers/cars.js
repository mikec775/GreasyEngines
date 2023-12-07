const mongoose = require('mongoose');
const Car = mongoose.model('Cars');

const carsCreate = function(req, res) {

  const usr = setName(req);

  Car.create({ 
    brand: req.body.brand,
    modelname: req.body.modelname,
    standardtype: req.body.standardtype,
    enginetype: req.body.enginetype,
    seats: req.body.seats,
    miles: req.body.miles,
    rating: req.body.reating,
    seattype: req.body.seattype,
  }).then((err, Car) => { 
  if (err) {
  res
  .status(400)
  .json(err);
  } else {
  res
  .status(201)
  .json(Car);
  }
  })
  };

  const carsListByDistance = function (req, res) { res
    .status(200)
    .json({"status" : "success"});
    };
    
        const carsReadOne = function (req, res) {
          if (req.params && req.params.carid) {  

            console.log(req.params.carid);

            Car
              .findById(req.params.carid)
              .then((car, err) => {
                if (!car) {
                  res	
                    .status(404) 
                    .json({	
                      "message": "carid def not found"
                    });	 
                  return;
                } else if (err) {
                  res	
                    .status(404) 
                    .json(err); 
                  return; 	
                }
                res		
                  .status(200)
                  .json(car);
              });
          } else {		
            res		
              .status(404) 	
              .json({	
                "message": "No carid in request"
              });		
          }
        };

        const carsUpdateOne = function (req, res) { res
            .status(200)
            .json({"status" : "success"});
            };
          const carsDeleteOne = function (req, res) { res
            .status(200)
            .json({"status" : "success"});
            };
          

module.exports = {
  carsCreate,
  carsListByDistance,
  carsReadOne,
  carsUpdateOne,
  carsDeleteOne
};


