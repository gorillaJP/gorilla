const hello = (req, res) => {
  res.send({ status: "Non secure OK" });
};

const helloSecure = (req, res) => {
  console.log("secure message body", req.body);
  res.send({ status: "Secure OK" });
};

export default { helloSecure, hello };
