import express from "express";
const router = express.Router();
import axios from "axios";

router.get("/home", (req, res) => {
  res.render("home");
});
router.get("/map", (req, res) => {
  res.render("map");
});
router.get("/result", (req, res) => {
  let city = req.query.city;
  console.log(city);
  console.log("city");
  // axios.get(
  //   `api.openweathermap.org/data/2.5/weather?q=${city}&appid=37068910d3019fcd4a44b0e539978cec`
  // ).then()
});

export default router;
