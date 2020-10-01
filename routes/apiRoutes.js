var db = require("../models");

module.exports = function (app) {
  app.get("/api/images", function (req, res) {
    //break it to find ONLY 1 specfic image
    db.Image.find({}).then(function (dbImages) {
      res.json(dbImages);
    });
  });

  app.put("/api/images/:id", function (req, res) {
    db.Image.updateOne({ _id: req.params.id }, { rating: req.body.rating }).then(function (dbImage) {
      res.json(dbImage);
    });
  });

  app.post("/api/images/create", function (req, res) {
     db.Image.create(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
  });
};