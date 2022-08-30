const prompt = require("prompt");
const ebookConverter = require("node-ebook-converter");
const path = require("path");
const fs = require("fs");

const schema = {
  properties: {
    sourcePath: {
      type: "string",
      required: true,
    },
    outputPath: {
      type: "string",
      required: true,
    },
  },
};

prompt.start();

prompt.get(schema, function (error, result) {
  if (error) {
    return false;
  }
  if (!fs.existsSync(result.sourcePath)) {
    console.warn("Source path does not exist!");
    return false;
  }

  if (!fs.existsSync(result.outputPath)) {
    console.warn("Output path does not exist!");
    return false;
  }

  fs.readdir(result.sourcePath, function (error, files) {
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
            output: path.join(result.outputPath, book + ".mobi"),
          })
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }
    });
  });
});
