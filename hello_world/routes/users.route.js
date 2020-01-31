var express = require("express");
var router = express.Router();

var controller = require("../controller/users.controller");
var validation = require("../validation/users.validation");

router.get("/", controller.index);
router.get("/search", controller.search);
router.get("/create", controller.getCreate);
router.post("/create", validation.createValidation, controller.postCreate);
router.get("/:id", controller.getId);

module.exports = router;
