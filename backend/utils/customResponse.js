const customResponse = {};

// generic response
customResponse.sendGenericResponse = function(req, res, statusCode = 200, result = null, message = "", error = "") {
    const response = {
      statusCode: statusCode,
      data: result,
      message: message,
      error: error,
    };
    res.status(parseInt(statusCode)).json(response);    
}

customResponse.makeGenericResponse = function () {
  return {
    statusCode: 200,
    result: null,
    message: "",
    error: "",
  }
}

module.exports = customResponse;