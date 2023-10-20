const { body, query ,param } = require("express-validator");

exports.saveInterviewValidator = [
  body("topicName")
    .exists()
    .withMessage("topicName is exists")
    .notEmpty()
    .withMessage("topicName is empty"),
    body("topicDesc")
    .exists()
    .withMessage("topicDesc is exists")
    .notEmpty()
    .withMessage("topicDesc is empty"),
    body("status")
    .exists()
    .withMessage("status is required"),
    body("userId")
    .exists()
    .withMessage("userId is exists")
    .notEmpty()
    .withMessage("userId is empty"),
];

 
exports.saveCommentValidator = [
  body("itvCardId")
    .exists()
    .withMessage("itvCardId is exists")
    .notEmpty()
    .withMessage("itvCardId is empty"),
    body("commentDesc")
    .exists()
    .withMessage("commentDesc is exists")
    .notEmpty()
    .withMessage("commentDesc is empty"),
    body("userId")
    .exists()
    .withMessage("userId is exists")
    .notEmpty()
    .withMessage("userId is empty"),
];



exports.updateInterviewStatusValidator = [
  body("itvCard")
  .exists()
  .withMessage("itvCard is required"),
  body("statusId")
  .exists()
  .withMessage("statusId is required"),
  body("userId")
  .exists()
  .withMessage("userId is exists")
  .notEmpty()
  .withMessage("userId is empty"),
];


 
