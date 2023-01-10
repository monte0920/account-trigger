require('dotenv').config()
const ethers = require("ethers");
const { WebSocketURL } = process.env;


const account1 = "0xa7B....";


const init_ether = function () {
    const customWsProvider = new ethers.providers.WebSocketProvider(WebSocketURL);

    customWsProvider.on("pending", (tx) => {
        customWsProvider.getTransaction(tx).then(function (transaction) {
            if (transaction?.to === account1) {
                console.log(transaction);
            }
        });
    });

    customWsProvider._websocket.on("error", async () => {
        console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
        setTimeout(init_ether, 3000);
    });
    customWsProvider._websocket.on("close", async (code) => {
        console.log(
            `Connection lost with code ${code}! Attempting reconnect in 3s...`
        );
        customWsProvider._websocket.terminate();
        setTimeout(init_ether, 3000);
    });
};


init_ether();