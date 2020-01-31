var express = require("express");
var router = express.Router();

var controller = require("../controller/users.controller");

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.getCreate);

router.post("/create", controller.postCreate);

router.get("/:id", controller.getId);

module.exports = router;
