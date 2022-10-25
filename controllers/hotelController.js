const hotelController = require("express").Router();

//TODO replace with real controller by assignment

hotelController.get("/:id/details", (req, res) => {
  res.render("details", {
    title: "BookingUni",
  });
});

hotelController.get('/create', (req, res) => {
    res.render('create',  {
        title: 'Create Hotel'
    });
});

hotelController.get('/edit', (req, res) => {
    res.render('edit',  {
        title: 'Edit Hotel'
    });
});

module.exports = hotelController;
