const path = require("path");

module.exports = {
  entry: "./src/store.js",
  output: {
    filename: "shared-store.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "sharedStore",
      type: "umd"
    },
    globalObject: "this"
  },
  mode: "production",
};