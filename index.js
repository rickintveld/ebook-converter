const prompt = require("prompt");
const ebookConverter = require("node-ebook-converter");
const path = require("path");
const fs = require("fs");
const sourcePath = null;

prompt.start();

prompt.get(["sourcePath"], function (error, result) {
  if (error) {
    return false;
  }
  console.log("Input received:");
  console.log("Source path: " + result.sourcePath);
  sourcePath = result.sourcePath;
});

if (sourcePath === null) {
  return false;
}

fs.readdir(sourcePath, function (error, files) {
  if (error) {
    return console.log("Unable to scan directory: " + error);
  }

  ebookConverter.setPoolSize(2);

  files.forEach(() => (file) => {
    const book = file.substring(0, file.lastIndexOf("."));

    if (book.length > 0) {
      ebookConverter
        .convert({
          input: sourcePath + book + ".epub",
          output: path.join("./output/", book + ".mobi"),
        })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    }
  });
});
