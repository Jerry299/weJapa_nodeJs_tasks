const port = 5000;
const server = require("./Routes/notesRoutes");

server.listen(port, () => {
  console.log(`server is live at port ${port}`);
});

// const fs = require("fs");
// const http = require("http");
// const { parse } = require("querystring");

// //beginning of adding a business note endpoint
// const server = http.createServer((request, response) => {
//   // create an instruction endpoint
//   if (request.url === "/" && request.method === "GET") {
//     const instructions = {
//       "Write New Business Note url": "/create/business-note",
//       "Read All Business Notes url": "/read/business-notes",
//       "Write New Health Note url": "/create/health-note",
//       "Read All Health Notes url": "/read/health-note",
//     };

//     response.writeHead(200, { "Content-Type": "application/json" });
//     response.end(JSON.stringify(instructions));
//   }

//   // creating a read note endpoint for business A GET REQUEST
//   if (request.url === "/read/business-notes" && request.method === "GET") {
//     fs.readFile("./businessNotes.txt", "utf8", (err, data) => {
//       if (err) {
//         console.log(
//           "There was an error reading the file in business Notes:   ",
//           err
//         );
//         response.setHeader("Content-Type", "application/json");
//         response.end({ error: "Could not read note" });
//       }
//       let arrBody = JSON.parse(data.toString());
//       console.log(arrBody);
//       response.setHeader("Content-Type", "application/json");
//       response.end(JSON.stringify({ note: arrBody }));
//     });
//   }

//   // taking a business note A POST REQUEST
//   else if (
//     request.method === "POST" &&
//     request.url === "/create/business-note"
//   ) {
//     let body = "";
//     request.on("error", (err) => {
//       console.log(err);
//       response.statusCode = 400;
//       response.end("Error sending note");
//     });
//     request.on("data", (chunk) => {
//       body += chunk;
//     });
//     request.on("end", () => {
//       body = parse(body);
//       //end of request
//       //beginning of response
//       response.on("error", (err) => {
//         console.log("response error: ", err);
//       });
//       //append a file to business note.txt and read it out
//       // also make sure the note is not empty
//       function getRandomIntInclusive(min, max) {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min + 1)) + min; //
//       }
//       const jsonReq = {
//         id: getRandomIntInclusive(0, 3670),
//         note: body.note,
//       };
//       console.log(jsonReq);
//       if (body.note.length > 10) {
//         fs.appendFile(
//           "./businessNotes.txt",
//           `${JSON.stringify(jsonReq)} + "\n"`,
//           (err) => {
//             if (err) {
//               console.log(
//                 "There was an error writing to the businessNote   :  ",
//                 err
//               );
//             }
//           }
//         );
//       } else {
//         response.statusCode = 411;
//         response.setHeader("Content-Type", "application/json");
//         response.end({
//           error:
//             "Note should contain more than 10 letters and should not be empty",
//         });
//       }
//       response.setHeader("Content-Type", "application/json");
//       response.end({
//         message: "Note has been successfuly added to business note",
//       });
//     });
//   }

//   //end of business note endpoint

//   //beginning of making a health related note
//   else if (request.url === "/read/health-note" && request.method === "GET") {
//     fs.readFile("./healthNotes.txt", (err, data) => {
//       if (err) {
//         response.statusCode = 503;
//         response.end("Unable to read health notes");
//       }

//       response.statusCode = 200;
//       response.setHeader("Content-Type", "application/json");
//       response.end(JSON.stringify({ "Health-Notes": data.toString() }));
//     });
//   } else if (
//     request.url === "/create/health-note" &&
//     request.method === "POST"
//   ) {
//     let body = "";
//     request
//       .on("error", () => {
//         response.statusCode = 400;
//         response.end("Could not send health notes");
//       })
//       .on("data", (chunk) => {
//         body += chunk;
//       })
//       .on("end", () => {
//         body = parse(body);

//         response.on("error", () => {
//           response.statusCode = 404;
//           response.end("Error while saving note,Try again");
//         });
//         console.log(body);
//         if (body.note.length > 10) {
//           fs.writeFile("./healthNotes.txt", body.note, (err) => {
//             if (err) {
//               console.log(
//                 "There was an error writing to the Health Note   :  ",
//                 err
//               );
//             }
//             response.statusCode = 200;
//             response.end("Created a health note successfully");
//           });
//         } else {
//           response.statusCode = 411;
//           response.end(
//             "Note should contain more than 10 letters and should not be empty"
//           );
//         }
//       });
//   } else if (
//     request.url === "/update/health-note" &&
//     request.method === "POST"
//   ) {
//     let body = "";
//     request
//       .on("error", () => {
//         response.statusCode = 400;
//         response.end("Could not send health notes");
//       })
//       .on("data", (chunk) => {
//         body += chunk;
//       })
//       .on("end", () => {
//         body = parse(body);

//         response.on("error", () => {
//           response.statusCode = 404;
//           response.end("Error while saving note,Try again");
//         });
//         console.log(body);
//         if (body.note.length > 10) {
//           fs.appendFile("./healthNotes.txt", body.note, (err) => {
//             if (err) {
//               console.log(
//                 "There was an error updating the Health Note   :  ",
//                 err
//               );
//             }
//             response.statusCode = 200;
//             response.end("Updated a health note successfully");
//           });
//         } else {
//           response.statusCode = 411;
//           response.end(
//             "Note should contain more than 10 letters and should not be empty"
//           );
//         }
//       });
//   }
// });

// const PORT = 5000;
// server.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });
