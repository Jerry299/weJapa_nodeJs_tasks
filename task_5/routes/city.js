import express from "express";
const router = express.Router();
import axios from "axios";
import key from "../config";
import L from "leaflet";

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
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
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
  const longitude = req.query.long;
  const latitude = req.query.lat;
  let zoom = 6;

  // const api = `https://tile.openweathermap.org/map/precipitation_new/6/6.7/6.1.png?appid=37068910d3019fcd4a44b0e539978cec`;
  // axios
  //   .get(
  //     `https://tile.openweathermap.org/map/${map}/${zoom}/${longitude}/${latitude}.png?appid=${key}`
  //   )
  //   .then((response) => {
  //     console.log(response.data);
  //     res.status(200).render("mapsResult", { data: response.data });
  //   })
  //   .catch((err) => {
  //     console.log("map Error", err);
  //     res.status(404).render("cityError");
  //   });

  res.render("mapsResult");
});

export default router;
