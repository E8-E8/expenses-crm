const Prospect = require("../models/Prospect");
const statusCodes = require("http-status-codes");

const getAllProspects = async (req, res) => {
  const { sort, name } = req.query;
  const filtersObject = {};

  if (name) filtersObject.name = { $regex: name, $options: "i" };

  let result = Prospect.find(filtersObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const prospects = await result.limit(limit).skip(skip);

  res.status(statusCodes.OK).json({ count: prospects.length, prospects });
};

const getProspect = async (req, res) => {
  const { prospectId } = req.params;
  const prospect = await Prospect.findById(prospectId);

  res.status(statusCodes.OK).json({ prospect });
};

const createProspect = async (req, res) => {
  let prospectData = {};

  if (req.headers.authorization == process.env.API_KEY) {
    prospectData = { ...req.body, status: "hot" };
  } else {
    prospectData = { ...req.body };
  }

  const prospect = await Prospect.create(prospectData);
  res.status(statusCodes.OK).json({ prospect });
};

const updateProspect = async (req, res) => {
  const prospectId = req.params.prospectId;
  const prospect = await Prospect.findByIdAndUpdate(
    { _id: prospectId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(statusCodes.OK).json({ customer: prospect });
};

const deleteProspect = async (req, res) => {
  const { prospectId } = req.params;
  const prospect = await Prospect.findByIdAndDelete({ _id: prospectId });
  res.status(statusCodes.OK).json({ prospect });
};

module.exports = {
  getAllProspects,
  getProspect,
  createProspect,
  updateProspect,
  deleteProspect,
};
