export const idlFactory = ({ IDL }) => {
  const NFTContract = IDL.Record({
    id: IDL.Nat,
    end: IDL.Nat,
    durationText: IDL.Text,
    claimedBTC: IDL.Float64,
    claimedLOM: IDL.Float64,
    duration: IDL.Nat,
    hashrate: IDL.Float64,
    owner: IDL.Text,
    metadata: IDL.Text,
    electricityPerDay: IDL.Float64,
    start: IDL.Nat,
    miningSite: IDL.Nat,
    LETBalance: IDL.Float64,
    amount: IDL.Nat,
    daysLeft: IDL.Nat,
    claimableBTC: IDL.Float64,
    claimableLOM: IDL.Float64,
  });
  const VeloController = IDL.Service({
    claimBTC: IDL.Func([IDL.Nat], [IDL.Nat], []),
    claimLOM: IDL.Func([IDL.Nat], [IDL.Nat], []),
    distributeBTC: IDL.Func([IDL.Float64, IDL.Float64], [IDL.Float64], []),
    distributeLOM: IDL.Func([IDL.Float64], [IDL.Float64], []),
    getAdmin: IDL.Func([], [IDL.Text], ["query"]),
    getNFTContract: IDL.Func([IDL.Nat], [NFTContract], ["query"]),
    getOwnedContracts: IDL.Func([], [IDL.Vec(NFTContract)], ["query"]),
    manualSync: IDL.Func([], [IDL.Nat], []),
    mintContract: IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Text, IDL.Nat, IDL.Nat, IDL.Nat, IDL.Float64],
      [IDL.Nat],
      []
    ),
    pauseContract: IDL.Func([IDL.Bool], [IDL.Bool], []),
    rechargeLET: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    syncOwner: IDL.Func([], [IDL.Nat], []),
  });
  return VeloController;
};
export const init = ({ IDL }) => {
  return [];
};
