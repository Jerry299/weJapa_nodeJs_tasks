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
const response1 = `
            <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Success</title>
    </head>
    <body
    style="
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <h2 style="font-size: 1.5rem; color: #158467;">wow!!! SUCCESS</h2>
    <h3 style="font-size: 1.2rem; color: #423144; font-weight: 600;">
      Note has been successfully deleted.
    </h3>
    <img
      src="https://icon2.cleanpng.com/20180314/foe/kisspng-business-internet-service-organization-computer-so-web-page-green-registration-success-button-5aa99d9ece0813.0931067015210653748439.jpg"
      alt="success-image"
    />
  </body>
</html>

            `;

const response2 = `
            <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Success</title>
    </head>
    <body
    style="
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <h2 style="font-size: 1.5rem; color: #158467;">wow!!! SUCCESS</h2>
    <h3 style="font-size: 1.2rem; color: #423144; font-weight: 600;">
      Note And Directory has been successfully deleted.
    </h3>
    <img
      src="https://icon2.cleanpng.com/20180314/foe/kisspng-business-internet-service-organization-computer-so-web-page-green-registration-success-button-5aa99d9ece0813.0931067015210653748439.jpg"
      alt="success-image"
    />
  </body>
</html>

            `;

module.exports = {
  createNoteHelper: createNoteHelper,
  response1: response1,
  response2: response2,
};
