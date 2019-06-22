const express = require('express');
const router = express.Router();
const Location = require("../models/location");

router.get('addTocoord/:add', (req, res, next) => {
    

    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
      console.log(result);
      res.status(200).json({ message: "Update successfully" });
    });
  });

module.exports = router;
