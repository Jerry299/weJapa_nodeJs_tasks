const fs = require("fs");
const { parse } = require("querystring");

const createNoteHelper = (req, res) => {
  const form_urlEncoded = "application/x-www-form-urlencoded";
  if (req.headers["content-type"] === form_urlEncoded) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      res(parse(body));
    });
  } else {
    let body = "";
    res(parse(body));
  }
};

module.exports = {
  createNoteHelper: createNoteHelper,
};
