const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const db = require('./models')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.Image.remove({})

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mtgPix", {
  useNewUrlParser: true
});

app.listen(PORT, function() {
  console.log(`Now listening on port: http://localhost:${PORT}`);
});
