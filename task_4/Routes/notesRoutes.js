const http = require("http");
const url = require("url");

const { homePage, notesPage, createNewNotes } = require("../Controllers/notes");

const server = http.createServer((req, res) => {
  const myURL = url.parse(req.url, true);
  console.log(myURL.query, " parsed_Url");
  if (myURL.pathname === "/" && req.method === "GET") {
    homePage(req, res);
  } else if (myURL.pathname === "/note" && req.method === "GET") {
    notesPage(req, res);
  } else if (myURL.pathname === "/note" && req.method === "POST") {
    createNewNotes(req, res);
  }
});

module.exports = server;
