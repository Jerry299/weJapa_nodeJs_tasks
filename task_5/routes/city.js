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

  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37068910d3019fcd4a44b0e539978cec`
    )
    .then((response) => {
      res.render("weather", { data: response.data });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("cityError");
    });
});
router.get("/map-result", (req, res) => {
  const map = req.query.map;
  const longitude = Number(req.query.long);
  const latitude = Number(req.query.lat);
  let reg = /\d/g;
  const api =
    "https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}";
  //validate input
  if (isNaN(longitude)) {
    res.json({ msg: "matched" });
  }
});

export default router;
