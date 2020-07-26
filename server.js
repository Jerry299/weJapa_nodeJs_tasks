const http = require("http");
const { parse } = require("querystring");

const server = http.createServer((request, response) => {
  if (request.url === "/" && request.method === "GET") {
    response.end("Hello World, Welcome to WeJapa Internships");
  }
  if (request.url === "/" && request.method === "POST") {
    collectRequestData(request, (result) => {
      console.log(result);
      response.end(`Parsed data belonging to ${result.name}`);
    });
    // response.end(`Hello ${body.name}, Welcome to WeJapa Internships`);
  }
});

const collectRequestData = (request, callback) => {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
};
server.listen(3000);
