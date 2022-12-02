const axios = require("axios");

const DING_API = "https://oapi.dingtalk.com/robot/send";

module.exports = async (req, res) => {
  const { body, query } = req;
  console.log(req)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  if (req.method.toLowerCase() == 'options') {
    res.send(200);  // 让options尝试请求快速结束
  }
  console.log(body);
  const { access_token } = query;

  if (access_token) {
    // sentry 9.1.2

    const reportMsg =
      `sentry\n` +
      `Project: ${body.project_name}\n` +
      `Error: ${body.event.title}\n` +
      `Sentry Issue: ${body.url}`;

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
