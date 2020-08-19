import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const obj = {
  id: 1,
  name: "gbegiri",
  description: "It is a yoruba local soup, it is sweet on amala",
};

app.get("/api/v1/recipe", (req, res) => {
  res.status(200).json({ "recipe Api": obj });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
