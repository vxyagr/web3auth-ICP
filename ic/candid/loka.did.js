export const idlFactory = ({ IDL }) => {
  const BankAddress = IDL.Record({
    name: IDL.Text,
    bankName: IDL.Text,
    accountNumber: IDL.Text,
  });
  const WalletAddress = IDL.Record({
    name: IDL.Text,
    currency: IDL.Text,
    address: IDL.Text,
  });
  const MinerData = IDL.Record({
    id: IDL.Nat,
    verified: IDL.Bool,
    username: IDL.Text,
    balance: IDL.Nat,
    hashrate: IDL.Nat,
    bankAddress: IDL.Vec(BankAddress),
    walletAddressText: IDL.Text,
    savedWalletAddress: IDL.Vec(WalletAddress),
    walletAddress: IDL.Principal,
    totalWithdrawn: IDL.Nat,
  });
  const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text });
  const HttpResponsePayload = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader),
  });
  const TransformArgs = IDL.Record({
    context: IDL.Vec(IDL.Nat8),
    response: HttpResponsePayload,
  });
  const CanisterHttpResponsePayload = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader),
  });
  const Miner = IDL.Service({
    clearData: IDL.Func([], [], []),
    getBalance: IDL.Func([], [IDL.Nat], ["query"]),
    getCKBTCBalance: IDL.Func([], [IDL.Nat], []),
    getIndex: IDL.Func([], [IDL.Nat], ["query"]),
    getMinerData: IDL.Func([], [MinerData], ["query"]),
    getWallets: IDL.Func([IDL.Nat], [IDL.Vec(WalletAddress)], ["query"]),
    getWithdrawn: IDL.Func([], [IDL.Nat], ["query"]),
    isNotPaused: IDL.Func([], [IDL.Bool], ["query"]),
    isVerified: IDL.Func([IDL.Principal], [IDL.Bool], ["query"]),
    pauseCanister: IDL.Func([IDL.Bool], [IDL.Bool], []),
    routine24: IDL.Func([], [IDL.Text], []),
    saveBankAddress: IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Bool], []),
    saveWalletAddress: IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Bool], []),
    sendCKBTC: IDL.Func([IDL.Text], [IDL.Bool], []),
    setCKBTCVault: IDL.Func([IDL.Principal], [IDL.Principal], []),
    setDappsKey: IDL.Func([IDL.Text], [IDL.Text], []),
    setF2PoolKey: IDL.Func([IDL.Text], [IDL.Text], []),
    testUSDT: IDL.Func([], [IDL.Text], []),
    transform: IDL.Func(
      [TransformArgs],
      [CanisterHttpResponsePayload],
      ["query"]
    ),
    verifyMiner: IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    whoCall: IDL.Func([], [IDL.Text], ["query"]),
    withdrawCKBTC: IDL.Func([IDL.Text, IDL.Nat, IDL.Text], [IDL.Bool], []),
    withdrawUSDT: IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Text, IDL.Text],
      [IDL.Text],
      []
    ),
  });
  return Miner;
};
export const init = ({ IDL }) => {
  return [];
};
