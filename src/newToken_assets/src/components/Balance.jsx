import React from "react";
import { newToken } from "../../../declarations/newToken";
import {Principal} from "@dfinity/principal";

function Balance() {
  const [inputPricipal, setPrincipal] = React.useState("");
  const [balanceResult, setBalanceResult] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [isHidden, setIsHidden] = React.useState(true);

  async function handleClick() {
    const principalID = Principal.fromText(inputPricipal); 
    const balanceNow = await newToken.balance(principalID);
    const symbolNow = await newToken.getSymbol();
    setIsHidden(false)
    setBalanceResult(balanceNow.toLocaleString());
    setSymbol(symbolNow);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input id="balance-principal-id" type="text" placeholder="Enter a Principal ID" value={inputPricipal} onChange={(e) => {setPrincipal(e.target.value)}}/>
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}> You have a balance of {balanceResult} {symbol}.</p>
    </div>
  );
}

export default Balance;
