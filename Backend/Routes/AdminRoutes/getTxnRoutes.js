const getTxndetails = require("../../Controllers/AdminControllers/getTxnsControllers");
const GetTxnRouter = require("express").Router();
GetTxnRouter.get("/admin-transactions", getTxndetails);
module.exports = GetTxnRouter;
