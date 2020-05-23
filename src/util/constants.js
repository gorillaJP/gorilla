const resp = {
  status: "",
  payload: {},
};

function SuccessResponse() {
  this.status = "ok";
  this.payload = {};
}
SuccessResponse.prototype = resp;

function ErrorResponse() {
  this.status = "error";
  this.payload = {};
}
SuccessResponse.prototype = resp;

const success = (data) => {
  let resp = new SuccessResponse();
  if (data) resp.payload = data;
  return resp;
};

const error = (err) => {
  let resp = new ErrorResponse();
  if (err) resp.payload = err;
  else resp.payload = "System Error";
  return resp;
};

export { success, error };
