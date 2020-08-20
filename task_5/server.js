import express from "express";
const app = express();
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).render("home");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
