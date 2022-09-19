import React from "react";
import {canisterId, createActor } from "../../../declarations/newToken";
import { AuthClient } from "@dfinity/auth-client"


function Faucet(props) {
  const [isPressed, setIsPressed] = React.useState(false)
  const [buttonText, setButtonText] = React.useState("Claim Token")

  async function handleClick(event) {
    setIsPressed(true)
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const returnText = await authenticatedCanister.payOut();
    setButtonText(returnText);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Claim 10,000 DOVE tokens to your account: {props.user}</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isPressed}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
