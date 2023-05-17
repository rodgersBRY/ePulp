const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get("/get-farmers", adminController.allFarmers);
router.get("/farmer/:farmerId", adminController.getFarmer);

router.post("/create-farmer", adminController.addFarmer);
router.post("/update-weight/:farmerId", adminController.addFarmerCoffeeWeight);

router.put("/update-farmer/:farmerId", adminController.editFarmer);

router.delete("/delete-farmer/:farmerId", adminController.deleteFarmer);

module.exports = router;
