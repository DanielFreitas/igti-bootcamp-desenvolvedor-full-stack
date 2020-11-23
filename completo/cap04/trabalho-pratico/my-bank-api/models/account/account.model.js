import { accountsModel } from "./account.schema.js";
import { ErrorHandler } from "../../helpers/errors.js";

// 4 - registrar um depósito em uma conta
export async function deposit(req, res) {
  let params = req.body;

  const account = await accountsModel.findOneAndUpdate(
    { agencia: params.agencia, conta: params.conta },
    { $inc: { balance: params.value } },
    { new: true }
  );

  if (!account) {
    throw new ErrorHandler(404, "Account not found.");
  }

  res.send(account);
}

// 5 - registrar um saque em uma conta
export async function withdraw(req, res) {
  let params = req.body;

  let account = await accountsModel.findOne({
    agencia: params.agencia,
    conta: params.conta,
  });

  if (!account) {
    throw new ErrorHandler(404, "Account not found.");
  }

  let taxa = 1;
  params.value = (params.value + taxa) * -1;

  if (account.balance + params.value < 0) {
    throw new ErrorHandler(404, "Insufficient funds.");
  }

  account = await accountsModel.findOneAndUpdate(
    { agencia: params.agencia, conta: params.conta },
    { $inc: { balance: params.value } },
    { new: true }
  );

  res.send(account);
}

// 6 - consultar o saldo da conta
export async function getAccount(req, res) {
  let params = req.params;

  const account = await accountsModel.findOne({
    agencia: params.agencia,
    conta: params.conta,
  });

  if (!account) {
    throw new ErrorHandler(404, "Account not found.");
  }

  res.send(account);
}

// 7 - excluir uma conta a retornar o número de contas ativas para esta agência
export async function deleteAccount(req, res) {
  let params = req.params;

  console.log(params);
  const accountToDelete = await accountsModel.findOneAndDelete(
    {
      agencia: params.agencia,
      conta: params.conta,
    },
    function (err, accounts) {
      if (err) {
        throw new ErrorHandler(404, err);
      } else {
        //console.log("Deleted User : ", accounts);
      }
    }
  );

  const accounts = await accountsModel.find({ agencia: params.agencia });

  if (!accounts) {
    throw new ErrorHandler(404, "Accounts not found.");
  }

  const numberOfAccounts = Object.keys(accounts).length;
  res.json(`{ agencia: ${params.agencia}, contas: ${numberOfAccounts}}`);
}

// 8 - realizar transferências entre contas
export async function transferency(req, res) {
  let params = req.body;

  let accountOrigin = await accountsModel.findOne(
    { conta: params.accountOrigin },
    { _id: 0, agencia: 1 }
  );

  if (!accountOrigin) {
    throw new ErrorHandler(404, "Invalid origin account.");
  }

  const accountDestiny = await accountsModel.findOne(
    { conta: params.accountDestiny },
    { _id: 0, agencia: 1 }
  );

  if (!accountDestiny) {
    throw new ErrorHandler(404, "Invalid destination account.");
  }

  let taxa = accountOrigin.agencia !== accountDestiny.agencia ? 8 : 0;

  const debitedAccount = await accountsModel.findOneAndUpdate(
    { conta: params.accountOrigin },
    { $inc: { balance: (params.value + taxa) * -1 } }
  );

  const creditedAccount = await accountsModel.findOneAndUpdate(
    { conta: params.accountDestiny },
    { $inc: { balance: params.value } }
  );

  accountOrigin = await accountsModel.findOne({ conta: params.accountOrigin });

  res.send(accountOrigin);
}

// 9 - média do saldo dos clientes
export async function getAverageBalance(req, res) {
  let params = req.params;

  const [averageBalance] = await accountsModel.aggregate([
    {
      $match: {
        agencia: Number(params.agencia),
      },
    },
    {
      $group: {
        _id: "$agencia",
        averageBalance: {
          $avg: "$balance",
        },
      },
    },
    {
      $project: {
        _id: 0,
        averageBalance: 1,
      },
    },
  ]);

  res.json(averageBalance);
}

// 10 - clientes com o menor saldo em conta
export async function getLowestBalances(req, res) {
  let params = req.query;
  let sort = -1;

  if (params.sort.toLowerCase() === "asc") {
    sort = 1;
  }

  const accounts = await accountsModel
    .find(
      {},
      {
        _id: 0,
        agencia: 1,
        conta: 1,
        balance: 1,
      }
    )
    .sort({ balance: sort })
    .limit(Number(params.limit));

  res.json(accounts);
}
// 11 - clientes mais ricos do banco
export async function getRichestClients(req, res) {
  let params = req.query;
  let sortSaldo = -1;
  let sortNome = -1;

  if (params.sortSaldo.toLowerCase() === "asc") {
    sortSaldo = 1;
  }

  if (params.sortNome.toLowerCase() === "asc") {
    sortNome = 1;
  }

  const accounts = await accountsModel
    .find(
      {},
      {
        _id: 0,
        agencia: 1,
        conta: 1,
        name: 1,
        balance: 1,
      }
    )
    .sort({ balance: sortSaldo, name: sortNome })
    .limit(Number(params.limit));

  res.json(accounts);
}

// 12 - transferir o cliente com maior saldo em conta de cada agência para a agência 99
export async function setTransferClient(req, res) {
  const accountsToTransfer = await getLargestBalanceAccounts();

  const promises = accountsToTransfer.map((account) => {
    return accountsModel.findOneAndUpdate(
      {
        _id: account._id,
      },
      {
        $set: {
          agencia: 99,
        },
      }
    );
  });

  await Promise.all(promises);

  const accounts99 = await accountsModel.find({ agencia: 99 });

  res.json(accounts99);
}

const getLargestBalanceAccounts = () => {
  return accountsModel.aggregate([
    {
      $match: {
        agencia: {
          $ne: 99,
        },
      },
    },
    {
      $sort: {
        balance: -1,
      },
    },
    {
      $group: {
        _id: "$agencia",
        accounts: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $project: {
        _id: 0,
        largestBalanceAccount: {
          $arrayElemAt: ["$accounts", 0],
        },
      },
    },
    {
      $project: {
        _id: "$largestBalanceAccount._id",
      },
    },
  ]);
};

export default {
  getAccount,
  deposit,
  withdraw,
  deleteAccount,
  transferency,
  getAverageBalance,
  getLowestBalances,
  getRichestClients,
  setTransferClient,
};
