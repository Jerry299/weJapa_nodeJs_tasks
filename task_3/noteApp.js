const fs = require("fs");
const http = require("http");
const { parse } = require("querystring");

const server = http.createServer((request, response) => {
  // taking a business note
  if (request.method === "POST" && request.url === "/notes/business") {
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

      if (body.length > 10) {
        fs.appendFile("./businessNotes.txt", body.note + "\n \n", (err) => {
          if (err) {
            console.log(
              "There was an error writing to the businessNote   :  ",
              err
            );
          }
          fs.readFile("./businessNotes.txt", "utf8", (err, data) => {
            if (err) {
              console.log(
                "There was an error reading the file in business Notes:   ",
                err
              );
            }
            console.log(data);
          });
        });
      } else {
        response.statusCode = 400;
        response.end(
          "Note should contain more than 10 letters and should not be empty"
        );
      }

      response.end("Note has been succesfuly added to business note");
    });
  } else {
    response.statusCode = 404;
    response.end("Enter a business note in the note");
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

//append a file to business note.txt and read it out

//   fs.appendFile("./businessNotes.txt", body, (err) => {
//     if (err) {
//       console.log(
//         "There was an error writing to the businessNote   :  ",
//         err
//       );
//     }
//     fs.readFile("./businessNotes.txt", "utf8", (err, data) => {
//       if (err) {
//         console.log(
//           "There was an error reading the file in business Notes:   ",
//           err
//         );
//       }
//       console.log(data);
//     });
//   })
