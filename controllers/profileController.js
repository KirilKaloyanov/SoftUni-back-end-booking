const { hasUser } = require('../middlewares/guards');
const { getByUserBooking } = require('../services/hotelService');
const profileController = require("express").Router();

//TODO replace with real controller by assignment

profileController.get("/", hasUser(), async (req, res) => {
  const bookings = await getByUserBooking(req.user._id);
  res.render("profile", {
    title: "Profile",
    user: Object.assign({bookings}, req.user), 
  });
});


module.exports = profileController;
