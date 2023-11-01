const { queryByList, queryByOne,queryByPagination } = require("../../config/pg-client.config");

const saveInterview = async (rec) => {
  try {
    let sql =
      ` INSERT INTO itv_card (topic_name, topic_desc, status,created_by, created_on, update_on )          ` +
      ` VALUES ($1,$2,$3,$4,NOW(),NOW())        ` +
      ` RETURNING id   `;
    
      let params = [];
      params.push(rec.topicName);
      params.push(rec.topicDesc);
      params.push(rec.status);
      params.push(rec.userId);

    return queryByOne(sql,params);
  } catch (err) {
    console.error("saveInterview error : " + err);
  }
};

const saveComment = async (rec) => {
  try {
    let sql =
      ` INSERT INTO itv_comment (itv_card_id, comment_desc,created_by, created_on, update_on )          ` +
      ` VALUES ($1,$2,$3,NOW(),NOW())                                                                   ` +
      ` RETURNING id   `;

      let params = [];
      params.push(rec.itvCardId);
      params.push(rec.commentDesc);
      params.push(rec.userId);

      return queryByOne(sql,params);
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

    return queryByList(sql,[]);
  } catch (err) {
    console.error("getInterviewList error : " + err);
  }
};


const getInterviewDetail = async (id) => {
  try {
    let sql =
      ` SELECT c.comment_desc, m.fullname, c.created_on, c.update_on          ` +
      ` FROM itv_comment c join itv_member m                                  ` +
      ` on m.user_id = c.created_by                                           ` +
      ` WHERE c.itv_card_id =    $1                                           ` +
      ` ORDER BY c.created_on  desc                                           ` ;

      let params = [];
      params.push(id);
      
    return queryByList(sql,params);
  } catch (err) {
    console.error("getInterviewList error : " + err);
  }
};

const updateInterviewStatus = async (rec) => {
  try {
    let sql =
      ` UPDATE itv_card                          ` +
      ` SET status = $1  , update_on = now()     ` +
      ` WHERE  id  = $2                          ` ;

      let params = [];
      params.push(rec.statusId);
      params.push(rec.itvCard);

      return queryByList(sql,params);
  } catch (err) {
    console.error("updateInterviewStatus error : " + err);
  }
};


const getInterviewPagination = async (pageNumber,pageSize) => {
  try {
    let sql =
    ` SELECT c.id,c.topic_name, c.topic_desc, s.status_name, m.fullname, c.created_on, c.update_on          `  +
    ` FROM itv_card c join itv_status s                                                                ` +
    ` on c.status = s.id                                                                               ` +
    ` join itv_member m                                                                                ` +
    ` on m.user_id = c.created_by                                                                      ` +
    ` ORDER BY c.created_on                                                                            ` +
    ` LIMIT $1    OFFSET (($2 - 1) * $1)                                  ` ;

 
    let params = [];


    return queryByPagination(sql,params,pageNumber,pageSize);
  } catch (err) {
    console.error("getInterviewList error : " + err);
  }
};

module.exports = {
  saveInterview,
  saveComment,
  getInterviewList,
  getInterviewDetail,
  updateInterviewStatus,
  getInterviewPagination
};
