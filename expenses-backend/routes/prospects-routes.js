const express = require("express");
const router = express.Router();

const {
  getAllProspects,
  getProspect,
  createProspect,
  updateProspect,
  deleteProspect,
} = require("../controllers/prospects-controller");

router.get("/", getAllProspects).post("/", createProspect);
router
  .get("/:prospectId", getProspect)
  .patch("/:prospectId", updateProspect)
  .delete("/:prospectId", deleteProspect);

module.exports = router;
