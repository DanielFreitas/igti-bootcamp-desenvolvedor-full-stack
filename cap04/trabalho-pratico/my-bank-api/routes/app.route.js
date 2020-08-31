import express from "express";
import accountModel from "../models/account/account.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1",
  });
});

router.get("/account/:agencia/:conta", async (req, res, next) => {
  try {
    res.send(await accountModel.getAccount(req, res, next));
  } catch (error) {
    next(error);
  }
});

router.put("/account/deposit", async (req, res, next) => {
  try {
    res.send(await accountModel.deposit(req, res, next));
  } catch (error) {
    next(error);
  }
});

router.post("/account/withdraw", async (req, res, next) => {
  try {
    res.send(await accountModel.withdraw(req, res, next));
  } catch (error) {
    next(error);
  }
});

router.delete("/account/:agencia/:conta", async (req, res, next) => {
  try {
    res.send(await accountModel.deleteAccount(req, res, next));
  } catch (error) {
    next(error);
  }
});

router.post("/account/transferency", async (req, res, next) => {
  try {
    res.send(await accountModel.transferency(req, res, next));
  } catch (error) {
    next(error);
  }
});

router.get("/agencia/:agencia/media-balance", async (req, res, next) => {
  try {
    res.send(await accountModel.getAverageBalance(req, res, next));
  } catch (error) {
    next(error);
  }
});

router.get("/account/get-balances", async (req, res, next) => {
  try {
    res.send(await accountModel.getLowestBalances(req, res, next));
  } catch (error) {
    next(error);
  }
});

router.get("/account/get-richest-clients", async (req, res, next) => {
  try {
    res.send(await accountModel.getRichestClients(req, res, next));
  } catch (error) {
    next(error);
  }
});

router.post("/account/transfer-client", async (req, res, next) => {
  try {
    res.send(await accountModel.setTransferClient(req, res, next));
  } catch (error) {
    next(error);
  }
});

export default router;
