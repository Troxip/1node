const fs = require("fs");
const http = require("http");
const url = require("url");
////////////////////////////////////

// const testIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `This is what we know about the avocado: ${testIn}`;
// console.log(textOut);

// Non Blocking
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("File has been written 🤣");
//       });
//     });
//   });
// });
// console.log("Will read this");

////////////////////////////////////
// Server

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`
);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  //Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el));

    res.end(tempOverview);

    //Product Page
  } else if (pathName === "/product") {
    res.end("This is the product");

    //API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
