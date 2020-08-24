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
  console.log(city, " ==== city");
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37068910d3019fcd4a44b0e539978cec`
    )
    .then((response) => {
      console.log(response.data);
      res.render("weather", { data: response.data });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("cityError");
    });
});

export default router;
