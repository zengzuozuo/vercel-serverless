const axios = require("axios");

const DING_API = "https://oapi.dingtalk.com/robot/send";

module.exports = async (req, res) => {
  let { body } = req;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  if (req.method.toLowerCase() == 'options') {
    res.send(200);  // 让options尝试请求快速结束
    return
  }
  body = JSON.parse(body)
  const access_token = process.env.TOKEN
  if (access_token) {
    if(!body) {
      res.send("data is required");
      return
    }
    const reportMsg =
      `Project: ${body.project_name}\n` +
      `Error: ${body.message}\n` +
      `Source: ${body.url}`;

    const { data: resData } = await axios({
      method: "post",
      url: DING_API,
      params: { access_token },
      data: {
        msgtype: "text",
        text: {
          content: reportMsg
        }
      }
    });
    
    res.send(resData);
  } else {
    res.send("access_token is required");
  }
};
