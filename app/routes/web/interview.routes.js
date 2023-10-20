const { expressValidator } = require("../../util/responseValidation");
const {
  saveInterviewValidator,
  saveCommentValidator,
  updateInterviewStatusValidator
} = require("../../service/validations/interview.validator");

module.exports = (app, requireBasicAuth) => {
  const config = require("config");
  const modelTD = require("../../controllers/web/interview.controller");

  var router = require("express").Router();

  router.post(
    "/save",
    requireBasicAuth,
    saveInterviewValidator,
    expressValidator,
    modelTD.saveInterview
  );

  router.post(
    "/save-comment",
    requireBasicAuth,
    saveCommentValidator,
    expressValidator,
    modelTD.saveComment
  );

  router.get(
    "/",
    requireBasicAuth,
    modelTD.getInterviewList
  );

  router.get(
    "/:id",
    requireBasicAuth,
    updateInterviewStatusValidator,
    expressValidator,
    modelTD.getInterviewDetail
  );


  router.post(
    "/update-status",
    requireBasicAuth,
    modelTD.updateInterviewStatus
  );

  app.use(`/robinhood/api/${config.VERSION}/interview`, router);
};
