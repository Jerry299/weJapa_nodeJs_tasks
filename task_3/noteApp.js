const fs = require("fs");
const http = require("http");
const { parse } = require("querystring");

//beginning of adding a business note endpoint
const server = http.createServer((request, response) => {
  // creating a read note endpoint for business A GET REQUEST
  if (request.url === "/notes/read/business" && request.method === "GET") {
    fs.readFile("./businessNotes.txt", "utf8", (err, data) => {
      if (err) {
        console.log(
          "There was an error reading the file in business Notes:   ",
          err
        );
        response.end("Could not read note");
      }
      // response.end({ notes: data });
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ note: data.toString() }));
    });
  }
  // create an instruction endpoint
  else if (request.url === "/" && request.method === "GET") {
    const instructions = `to add a new business note, go to this endpoint : '/notes/business', To read the content of the business note
    note go to this endpoint : '/notes/read/business'`;

    response.end(JSON.stringify({ instructions }));
  }

  // taking a business note A POST REQUEST
  else if (request.method === "POST" && request.url === "/notes/business") {
    let body = "";
    request.on("error", (err) => {
      console.log(err);
      response.statusCode = 400;
      response.end("Error sending note");
    });
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      body = parse(body);
      //end of request
      //beginning of response
      response.on("error", (err) => {
        console.log("response error: ", err);
      });
      //append a file to business note.txt and read it out
      // also make sure the note is not empty

      if (body.note.length > 10) {
        fs.appendFile(
          "./businessNotes.txt",
          body.note.padStart(3, " "),
          (err) => {
            if (err) {
              console.log(
                "There was an error writing to the businessNote   :  ",
                err
              );
            }
          }
        );
      } else {
        response.statusCode = 400;
        response.end(
          "Note should contain more than 10 letters and should not be empty"
        );
      }

      response.end("Note has been succesfuly added to business note");
    });
  }
});
//end of adding a business note endpoint

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
