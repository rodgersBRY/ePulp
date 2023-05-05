const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get("/get-farmers", adminController.allFarmers);

router.post("/create-farmer", adminController.addFarmer);

router.delete("/delete-farmer/:farmerId", adminController.deleteFarmer);

module.exports = router;
