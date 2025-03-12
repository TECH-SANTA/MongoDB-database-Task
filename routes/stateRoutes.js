const express = require("express");
const { addState, getStatePopulation, getTotalPopulation, getAverageDensity, getAllStates } = require("../controllers/stateController");

const router = express.Router();

router.post("/", addState);
router.get("/:name/population", getStatePopulation);
router.get("/total-population", getTotalPopulation);
router.get("/average-density", getAverageDensity);
router.get("/", getAllStates);

module.exports = router;
