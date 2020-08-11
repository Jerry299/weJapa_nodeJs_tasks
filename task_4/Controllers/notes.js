const fs = require("fs");
const { parse } = require("querystring");
const { createNoteHelper } = require("../utils/helper");

const notesPage = async (req, res) => {
  req.statusCode = 200;
  res.setHeader = { "Content-type": "text/html" };
  res.end(
    `
    <html style="font-family: Arial, Helvetica, sans-serif;">
    <h1 style="text-align: center; margin-top: 150px; color: #158467; ">Hello, Welcome to notes!</h1>
    <h3 style="text-align: center; margin: 50px 0;">CREATE A NEW NOTE USING THE FORM BELOW</h3>
    <div style="width: 500px; margin: auto">
    <form style="display: grid;" action="/note" method="POST">
    <label style="margin-bottom: 10px; font-weight: bold;">Name of your note file</label>
    <input type="text" name="title" placeholder="Name of your note file" style="padding: 12px; margin-bottom: 20px" />
    <label style="margin-bottom: 10px; font-weight: bold;">Where do you want to save your note(Folder Name)</label>
    <input type="text" name="folder" placeholder="Enter the name of folder" style="padding: 12px; margin-bottom: 20px" />
    <label style="margin-bottom: 10px; font-weight: bold;">What do you want to write?</label>
    <textarea name="note" rows="4" style="padding: 12px; margin-bottom: 20px; resize: none;" placeholder="Enter your note here"></textarea>
    <button style="background-color: #ff5722; padding: 10px; color: #fff; cursor: pointer; font-size: 20px; font-weight: 600; border-radius: 30px; width: 50%;" type="submit"; >Create Note</button>
    </form>
    </div>
    </html>
    `
  );
};
const homePage = async (req, res) => {
  req.statusCode = 200;
  res.setHeader = { "Content-type": "text/html" };
  res.end(
    `
    <html >
        <body style="font-family: Arial, Helvetica, sans-serif;">
            <h2 style="text-align: center; margin-top: 150px; color: #158467;">Welcome,
             Summary of Available Routes</h2>
            <ol style="  
                font-size: 1.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                 ">
            <li style="margin-bottom: 1.5rem"><a href='/folders'>Show all folders</a>  (endpoint = /folders)</li>
            <li style="margin-bottom: 1.5rem"><a href='/all-notes'>Show all notes</a>  (endpoint = /all-notes</li>
            <li style="margin-bottom: 1.5rem"><a href='/note'>Add new Note</a>  (endpoint = /note)</li>
            <li style="margin-bottom: 1.5rem"><a href='/update'>Edit Note</a>  (endpoint = /edit)</li>
            <li style="margin-bottom: 1.5rem"><a href='/delete'>Delete Note</a> (endpoint = /delete)</li>
            </ol>
       </body>
    </html>
    `
  );
};

//Create a new note
const createNewNotes = async (req, res) => {
  createNoteHelper(req, (body) => {
    try {
      // make sure the fields are not blank
      if (
        body.title === "undefined" ||
        body.folder === "undefined" ||
        body.note === "undefined" ||
        body.title.length < 1 ||
        body.folder.length < 1 ||
        body.note.length < 10
      ) {
        //former json response to be sent.switched to html now
        // const jsonResponse = {
        //   success: false,
        //   message:
        //     "title,folder and note cannot be blank and less than 5 letters,Notes should be more than 10 letters.",
        // };
        const htmlResponse = `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fail</title>
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
    <h2 style="font-size: 1.5rem; color: #900d0d;">OOPPS...</h2>
    <h3 style="font-size: 1.2rem; color: #423144; font-weight: 600;">
      Sorry, You can not create a note
    </h3>
    <img
      src="https://png.pngtree.com/png-vector/20190627/ourmid/pngtree-25d-stereo-404-page-lost-png-image_1511831.jpg"
      alt="fail-image"
    />
    <p style="font-size: 1.1rem; color: #0f4c75;">
      Title and folder cannot be blank
    </p>
    <h5 style="font-size: 1.1rem; color: #0f4c75;">
      note should be more than 10 letters
    </h5>
  </body>
</html>

        `;
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(htmlResponse);
      }
      //check if folder exists
      if (!fs.existsSync(body.folder)) {
        let { folder, title, note } = body;

        fs.mkdir(`db/${folder}`, { recursive: true }, (err) => {
          if (err) {
            console.log("Error when creating folder");
          }
        });
        fs.appendFile(
          `db/${folder}/${title}.txt`,
          `${note}\n`,
          "utf8",
          (err) => {
            if (err) {
              console.log("Error while writing note");
            }
            // const response = {
            //   success: true,
            //   title: title,
            //   folder: folder,
            // };
            const response = `
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
    <h2 style="font-size: 1.5rem; color: #158467;">Heeya, SUCCESS</h2>
    <h3 style="font-size: 1.2rem; color: #423144; font-weight: 600;">
      Note has been successfully created.
    </h3>
    <img
      src="https://icon2.cleanpng.com/20180314/foe/kisspng-business-internet-service-organization-computer-so-web-page-green-registration-success-button-5aa99d9ece0813.0931067015210653748439.jpg"
      alt="success-image"
    />
  </body>
</html>

            `;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(response);
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  });
};

//get all directories /folders
const getAllFolders = async (req, res) => {
  fs.readdir("db", (err, stats) => {
    if (err) throw error(err);
    let statItem = stats.map((item) => {
      return ` <li style=" font-size: 1.5rem; margin-left: 7rem;" >${item}</li>`;
    });

    const allFoders = `
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif;">
      <h2 style="font-size: 3.7rem;
                color: #158467;
                text-align: center;
                margin: 2rem;">
                List of all Directories
        </h2>
        <div style="width: 30% ;display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;">
          <ol >
           ${statItem}
          </ol>
        </div>
    </body>
    </html>
    `;
    res.end(allFoders);
  });
};

//delete notes

module.exports = {
  homePage: homePage,
  notesPage: notesPage,
  createNewNotes: createNewNotes,
  getAllFolders: getAllFolders,
};
