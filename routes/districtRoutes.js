const express = require("express");
const { addDistrict, updateDistrictPopulation, deleteDistrict, getAllDistricts, getDistrictsWithStates, groupDistrictsByState } = require("../controllers/districtController");

const router = express.Router();

router.post("/", addDistrict);
router.put("/:name/population", updateDistrictPopulation);
router.delete("/:name", deleteDistrict);
router.get("/", getAllDistricts);
router.get("/with-states", getDistrictsWithStates);
router.get('/group-by-state', groupDistrictsByState);

module.exports = router;