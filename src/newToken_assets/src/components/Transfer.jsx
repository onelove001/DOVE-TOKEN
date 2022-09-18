import React from "react";
import {canisterId, createActor } from "../../../declarations/newToken";
import {AuthClient} from "@dfinity/auth-client"
import {Principal} from "@dfinity/principal"

function Transfer() {
  const [recipientID, setRecipientID] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [disabled, setDisabled] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const [feedback, setFeedback] = React.useState("")

  async function handleClick() {
    setHidden(true)
    setDisabled(true)

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const result = (await authenticatedCanister.transfer(Principal.fromText(recipientID), parseInt(amount)));
    setFeedback(result);
    setDisabled(false);
    setHidden(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value = {recipientID}
                onChange = {(e) => setRecipientID(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value = {amount}
                onChange = {(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" disabled={disabled} onClick={handleClick} >
            Transfer
          </button>
        </p>
      </div>
      <p hidden={hidden}> {feedback} </p>
    </div>
  );
}

export default Transfer;
