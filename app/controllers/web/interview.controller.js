const logs = require("../../util/logging");
const { Response } = require("../../util/responseMapper");
const utils = require("../../util/util");
const dbService = require("../../service/db/pg.dbservice");

exports.saveInterview = async (req, res) => {
  logs.logWebInfo(req);
  try {
    const body = req.body;
    let result = await dbService.saveInterview(body)
    let data = { id : result.id }

    return Response.success(res, data);
  } catch (error) {
    logs.loggerWeb.error(`saveInterview error : ${error}`);
    return Response.error(res, error.message);
  }
};


exports.saveComment = async (req, res) => {
  logs.logWebInfo(req);
  try {
    const body = req.body;
    let result = await dbService.saveComment(body)
    let data = { id : result.id }

    return Response.success(res, data);
  } catch (error) {
    logs.loggerWeb.error(`saveComment error : ${error}`);
    return Response.error(res, error.message);
  }
};

exports.getInterviewList = async (req, res) => {
  logs.logWebInfo(req);
  try {
    let result = await dbService.getInterviewList()
    
    return Response.success(res, result);
  } catch (error) {
    logs.loggerWeb.error(`getInterviewList error : ${error}`);
    return Response.error(res, error.message);
  }
};


exports.getInterviewDetail = async (req, res) => {
  logs.logWebInfo(req);
  try {
    const id = req.params.id;
    console.log(id)
    let result = await dbService.getInterviewDetail(id)

    return Response.success(res, result);
  } catch (error) {
    logs.loggerWeb.error(`getInterviewDetail error : ${error}`);
    return Response.error(res, error.message);
  }
};

exports.getInterviewPagination = async (req, res) => {
  logs.logWebInfo(req);
  try {
    const { pageNumber, pageSize  } = req.query;
    let result = await dbService.getInterviewPagination(pageNumber,pageSize)

    return Response.success(res, result);
  } catch (error) {
    logs.loggerWeb.error(`getInterviewDetail error : ${error}`);
    return Response.error(res, error.message);
  }
};
 
 

exports.updateInterviewStatus = async (req, res) => {
  logs.logWebInfo(req);
  try {
    const body = req.body;
    let result = await dbService.updateInterviewStatus(body)
    console.log(result)

    return Response.success(res, result);
  } catch (error) {
    logs.loggerWeb.error(`updateInterviewStatus error : ${error}`);
    return Response.error(res, error.message);
  }
};
 
