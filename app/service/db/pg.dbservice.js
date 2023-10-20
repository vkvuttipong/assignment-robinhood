const { Client } = require("pg");
const dbConfig = require("config");
const { queryByList, queryByOne } = require("../../config/pg-client.config");

const saveInterview = async (rec) => {
  try {
    let sql =
      ` INSERT INTO itv_card (topic_name, topic_desc, status,created_by, created_on, update_on )          ` +
      ` VALUES ('${rec.topicName}','${rec.topicDesc}','${rec.status}','${rec.userId}',NOW(),NOW())        ` +
      ` RETURNING id   `;

    return queryByOne(sql);
  } catch (err) {
    console.error("saveInterview error : " + err);
  }
};

const saveComment = async (rec) => {
  try {
    let sql =
      ` INSERT INTO itv_comment (itv_card_id, comment_desc,created_by, created_on, update_on )          ` +
      ` VALUES ('${rec.itvCardId}','${rec.commentDesc}', '${rec.userId}',NOW(),NOW())  ` +
      ` RETURNING id   `;

    return queryByOne(sql);
  } catch (err) {
    console.error("saveInterview error : " + err);
  }
};

const getInterviewList = async () => {
  try {
    let sql =
      ` SELECT c.id,c.topic_name, c.topic_desc, s.status_name, m.fullname, c.created_on, c.update_on          `  +
      ` FROM itv_card c join itv_status s                                                                ` +
      ` on c.status = s.id                                                                               ` +
      ` join itv_member m                                                                                ` +
      ` on m.user_id = c.created_by                                                                      ` +
      ` ORDER BY c.created_on                                                                            ` ;

    return queryByList(sql);
  } catch (err) {
    console.error("getInterviewList error : " + err);
  }
};


const getInterviewDetail = async () => {
  try {
    let sql =
      ` SELECT c.comment_desc, m.fullname, c.created_on, c.update_on          `  +
      ` FROM itv_comment c join itv_member m                                  ` +
      ` on m.user_id = c.created_by                                           ` +
      ` ORDER BY c.created_on  desc                                           ` ;
      
    return queryByList(sql);
  } catch (err) {
    console.error("getInterviewList error : " + err);
  }
};

const updateInterviewStatus = async (rec) => {
  try {
    let sql =
      ` UPDATE itv_card                                        ` +
      ` SET status = '${rec.statusId}'  , update_on = now()    ` +
      ` WHERE  id  = '${rec.itvCard}'                          `;

    return queryByOne(sql);
  } catch (err) {
    console.error("updateInterviewStatus error : " + err);
  }
};

 

module.exports = {
  saveInterview,
  saveComment,
  getInterviewList,
  getInterviewDetail,
  updateInterviewStatus
};
