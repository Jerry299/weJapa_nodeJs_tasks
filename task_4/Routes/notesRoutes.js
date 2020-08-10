const http = require("http");
const url = require("url");

const {
  homePage,
  notesPage,
  createNewNotes,
  getAllFolders,
} = require("../Controllers/notes");

const server = http.createServer((req, res) => {
  const myURL = url.parse(req.url, true);

  if (myURL.pathname === "/" && req.method === "GET") {
    homePage(req, res);
  } else if (myURL.pathname === "/note" && req.method === "GET") {
    notesPage(req, res);
  } else if (myURL.pathname === "/note" && req.method === "POST") {
    createNewNotes(req, res);
  } else if (myURL.pathname === "/folders" && req.method === "GET") {
    getAllFolders(req, res);
  }
});

module.exports = server;
