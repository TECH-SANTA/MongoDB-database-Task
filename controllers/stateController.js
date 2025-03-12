const State = require("../models/State");


exports.addState = async (req, res) => {
  try {
    const { name, population, area } = req.body;

    if (!name || !population || !area) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingState = await State.findOne({ name });
    if (existingState) {
      return res.status(400).json({ error: "State already exists" });
    }

    const newState = await State.create({ name, population, area });
    res.status(201).json({ message: "State added successfully", data: newState });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getStatePopulation = async (req, res) => {
  try {
    const state = await State.findOne({ name: req.params.name });
    if (!state) return res.status(404).json({ error: "State not found" });

    res.json({ state: state.name, population: state.population });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTotalPopulation = async (req, res) => {
  try {
    const total = await State.aggregate([{ $group: { _id: null, totalPopulation: { $sum: "$population" } } }]);
    res.json({ totalPopulation: total[0]?.totalPopulation || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAverageDensity = async (req, res) => {
  try {
    const states = await State.aggregate([{ $project: { name: 1, density: { $divide: ["$population", "$area"] } } }]);
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
