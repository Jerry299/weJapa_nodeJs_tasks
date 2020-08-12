const fs = require("fs");
const { parse } = require("querystring");
const { createNoteHelper, response1, response2 } = require("../utils/helper");

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
            
            <li style="margin-bottom: 1.5rem"><a href='/note'>Add new Note</a>  (endpoint = /note)</li>
            
            <li style="margin-bottom: 1.5rem"><a href='/delete-note'>Delete Note</a> (endpoint = /delete-note)</li>
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

    const allFolders = `
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
    res.end(allFolders);
  });
};

//delete a note
const showNotes = async (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  const deletePage = `<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>delete a note</title>
  </head>
  <body
    style="
      margin-top: 9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <h2 style="font-size: 1.5rem; color: #eb1b1b;">Delete A Note</h2>
    <form
      action="/delete-note"
      method="POST"
      style="display: grid; width: 500px;"
    >
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-bottom: 3rem;
        "
      >
        <label for="note" style="margin-bottom: 0.5rem; font-weight: 700;"
          >Name of Note to be deleted :
        </label>
        <input
          name="note"
          type="text"
          placeholder="Enter note's name to be deleted"
          style="width: 400px; padding: 0.5rem;"
        />
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-bottom: 3rem;
        "
      >
        <label for="dir" style="margin-bottom: 0.5rem; font-weight: 700;"
          >Directory where File is located:
        </label>
        <input
          name="dir"
          type="text"
          placeholder="Enter note's name to be deleted"
          style="width: 400px; padding: 0.5rem;"
        />
      </div>
      <button
        type="submit"
        style="
          padding: 9px;
          border-radius: 20px;
          width: 40%;
          margin-left: 9rem;
          cursor: pointer;
          background-color: #c22525;
          color: rgb(248, 246, 244);
        "
      >
        Delete
      </button>
    </form>
  </body>
</html>
`;
  res.end(deletePage);
};
const delNote = async (req, res) => {
  createNoteHelper(req, (body) => {
    try {
      let { note, dir } = body;
      if (note.length < 3 || dir.length < 3) {
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
      Sorry, You can not delete a note
    </h3>
    <img
      src="https://png.pngtree.com/png-vector/20190627/ourmid/pngtree-25d-stereo-404-page-lost-png-image_1511831.jpg"
      alt="fail-image"
    />
    
    <h5 style="font-size: 1.1rem; color: #0f4c75;">
      Note and Directory should be more than 5 letters
    </h5>
  </body>
</html>

        `;
        res.writeHead(404, { "content-type": "text/html" });
        res.end(htmlResponse);
      }

      fs.stat(`./db/${dir}/${note}.txt`, (err, stats) => {
        if (err) {
          console.log(err);
          const response = `
          <body
    style="
      margin-top: 9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <h2 style="font-size: 1.5rem; color: #eb1b1b;">
      File Or Directory Doesn't Exists, Please Try Agin
    </h2>
  </body>`;
          res.writeHead(404, { "content-type": "text/html" });
          res.end(response);
        }
        if (stats) {
          fs.readdir(`./db/${dir}`, (err, files) => {
            if (err) res.end(err);

            if (files.length < 2) {
              fs.unlink(`./db/${dir}/${note}.txt`, (err) => {
                if (err) res.end(err);
                fs.rmdir(`./db/${dir}`, () => {
                  res.writeHead(200, { "Content-Type": "text/html" });
                  res.end(response2);
                });
              });
            } else {
              fs.unlink(`./db/${dir}/${note}.txt`, (err) => {
                if (err) res.end(err);

                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(response1);
              });
            }
            console.log(files.length);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  homePage: homePage,
  notesPage: notesPage,
  createNewNotes: createNewNotes,
  getAllFolders: getAllFolders,
  showNotes: showNotes,
  delNote: delNote,
};
