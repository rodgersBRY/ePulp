const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

const authGuard = require("../authguard")

router.get("/get-farmers", adminController.allFarmers);
router.get("/farmer/:farmerId", authGuard, adminController.getFarmer);

router.post("/create-farmer", authGuard, adminController.addFarmer);
router.post("/update-weight/:farmerId", authGuard, adminController.addFarmerCoffeeWeight);

router.put("/update-farmer/:farmerId", authGuard, adminController.editFarmer);

router.delete("/delete-farmer/:farmerId", authGuard, adminController.deleteFarmer);

module.exports = router;
