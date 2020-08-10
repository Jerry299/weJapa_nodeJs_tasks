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
        const response = {
          success: false,
          message:
            "title,folder and note cannot be blank and less than 5 letters,Notes should be more than 10 letters.",
        };
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response));
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
            const response = {
              success: true,
              title: title,
              folder: folder,
            };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));
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

//get a
module.exports = {
  homePage: homePage,
  notesPage: notesPage,
  createNewNotes: createNewNotes,
  getAllFolders: getAllFolders,
};
