import Auth from "./models/Authentication.js";
import customResponse from "./utils/customResponse.js";

export const headersValidation = async (req, res, next) => {
  console.log("Validating application headers");
  const response = customResponse.makeGenericResponse();
  const headers = req.headers;
  if (!headers.app_name || !headers.app_key) {
    response.statusCode = 400;
    response.message = "Please provide app_name & app_key both.";
    response.error = "Details missing";
    return res.status(400).json(response);
  }
  const app_name = headers.app_name;
  const app_key = headers.app_key;
  let auth = await Auth.findOne({ app_name, app_key, isActive: true });
  if(!auth){
    response.statusCode = 401;
    response.message = "Invalid app_name and app_key.";
    response.error = "Unauthorised access";
    return res.status(401).json(response);
  }
  next();
};

