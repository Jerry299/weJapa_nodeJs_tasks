// build a basic REPL server that takes a command and prints it in
//     uppercase if the command is lowercase and lowercase if the command is uppercase using Node.

// my solution

const repl = require("repl");

// repl.start("> ").context.welcome = message;
const convertCase = (cmd) => {
  // check uppercase
  if (cmd === cmd.toUpperCase()) {
    console.log(cmd.toLowerCase());
  }
  //check lower case
  else if (cmd === cmd.toLowerCase()) {
    console.log(cmd.toUpperCase());
  } // else tell the user that the system cannot recognise their input
  else {
    console.log(
      "Input not recognised,try an all capitalized input or an all small letter input"
    );
  }
};
repl.start({ prompt: "> ", eval: convertCase });
