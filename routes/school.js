const express = require("express");
const router = express.Router();
const connection = require("../db/connection");

// Add School API
router.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({ message: "Invalid input data." });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  connection.query(query, [name, address, latitude, longitude], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to add school.", error: err });
    }
    res.status(201).json({ message: "School added successfully." });
  });
});

// List Schools API
router.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  if (
    typeof parseFloat(latitude) !== "number" ||
    typeof parseFloat(longitude) !== "number"
  ) {
    return res.status(400).json({ message: "Invalid latitude or longitude." });
  }

  const userLatitude = parseFloat(latitude);
  const userLongitude = parseFloat(longitude);

  const query = "SELECT * FROM schools";
  connection.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve schools.", error: err });
    }

    // Calculate distances and sort
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const toRadians = (degree) => degree * (Math.PI / 180);
      const R = 6371; // Earth's radius in km
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const sortedSchools = results
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          userLatitude,
          userLongitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  });
});

module.exports = router;
