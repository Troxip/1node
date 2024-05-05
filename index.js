const fs = require("fs");

// const testIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `This is what we know about the avocado: ${testIn}`;
// console.log(textOut);

// Non Blocking
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});
