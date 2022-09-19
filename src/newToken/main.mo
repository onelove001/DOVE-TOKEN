import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {
  let owner : Principal = Principal.fromText("ajyak-cbqa6-g2pm3-yzxug-aowy2-krk5f-qade4-u4knb-ez5q6-2ve7p-tae");
  let totalCoinSupply : Nat = 1000000000;
  let symbol : Text = "DOVE";

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
    balances.put(owner, totalCoinSupply);
  };

  public query func balance (walletOwner: Principal) : async Nat {

    let balance : Nat = switch (balances.get(walletOwner)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public query func getSymbol (): async Text {
    return symbol;
  };

  public shared(msg) func payOut(): async Text {

    if (balances.get(msg.caller) == null) {
      let amount = 10000;
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "Already Claimed";
    };

  };

  public shared(msg) func transfer (to: Principal, amount : Nat): async Text {
    let fromBalance = await balance(msg.caller);
    if (fromBalance >= amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balance(to);
      let newToBalance : Nat = toBalance + amount;
      balances.put(to, newToBalance);
      return "Transaction Successful";
    } else {
      return "Insufficient Tokens!";
    };

  };

  system func preupgrade () {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade () {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalCoinSupply);
    }
  };

};
