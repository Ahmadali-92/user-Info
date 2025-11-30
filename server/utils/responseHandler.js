function response({
  res,
  status = 200,
  message = '',
  body = null,
  token = null,
}) {
  const responseObj = {message};
  if (body) responseObj.body = body;
  if (token) responseObj.token = token;

  return res.status(status).json(responseObj);
}

module.exports = {response};
