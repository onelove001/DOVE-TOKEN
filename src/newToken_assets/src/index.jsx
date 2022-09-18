import ReactDOM from 'react-dom';
import React from 'react';
import App from "./components/App";
import {AuthClient} from "@dfinity/auth-client";

const init = async () => {

    const authClient = await AuthClient.create();
    if (authClient.isAuthenticated) {
        handleAuthentication(authClient)
    } else {
        await authClient.login ({
        internetProvider:"https://identity.ic0.app/#authorize",
        onSuccess: () => {
            handleAuthentication(authClient)
            }
        });
    }
}

async function handleAuthentication(client) {
    const identity = client.getIdentity();
    console.log(identity)
    const userPrincipal = identity._principal.toString();
    console.log(userPrincipal)
    ReactDOM.render(<App loggedInUser = {userPrincipal}/>, document.querySelector("#root"));
}

init();
