const District = require("../models/District");
const State = require("../models/State");

exports.addDistrict = async (req, res) => {
  try {
    const { name, population, state_id } = req.body;

    if (!name || !population || !state_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const state = await State.findById(state_id);
    if (!state) return res.status(404).json({ error: "State not found" });

    const newDistrict = await District.create({ name, population, state_id });
    res.status(201).json({ message: "District added successfully", data: newDistrict });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDistrictPopulation = async (req, res) => {
  try {
    const updated = await District.findOneAndUpdate(
      { name: req.params.name },
      { $set: { population: req.body.population } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "District not found" });
    res.json({ message: "District updated", data: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDistrict = async (req, res) => {
  try {
    const deleted = await District.findOneAndDelete({ name: req.params.name });

    if (!deleted) return res.status(404).json({ error: "District not found" });
    res.json({ message: "District deleted", data: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDistrictsWithStates = async (req, res) => {
  try {
    const districtsWithStates = await District.find().populate('state_id', 'name population');
    res.status(200).json(districtsWithStates);
  } catch (error) {
    console.error('Error fetching districts with states:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.groupDistrictsByState = async (req, res) => {
  try {
    const result = await District.aggregate([
      {
        $lookup: {
          from: 'states', 
          localField: 'state_id',
          foreignField: '_id',
          as: 'state'
        }
      },
      {
        $unwind: '$state'
      },
      {
        $group: {
          _id: '$state.name',
          totalPopulation: { $sum: '$population' }
        }
      },
      {
        $sort: { totalPopulation: -1 } 
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error grouping districts by state:', error.message);
    res.status(500).json({ error: error.message });
  }
};

