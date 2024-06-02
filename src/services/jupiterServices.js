// services/jupiterServices.js
import axios from "axios";
import fs from "fs";
import solanaWeb3 from "@solana/web3.js";

async function downloadTokensList() {
    const response = await axios.get("https://token.jup.ag/strict");
    const { data } = response;
    const tokens = data.map(({ symbol, address, decimals }) => ({
        symbol,
        address,
        decimals
    }));
    fs.writeFileSync("tokens.txt", JSON.stringify(tokens));
    return data;
}

async function getTokens() {
    if (!fs.existsSync("tokens.txt")) {
        await downloadTokensList();
    }
    return JSON.parse(fs.readFileSync("tokens.txt"));
}

async function getTokenAccounts(connection, address, tokenMintAddress) {
    return await connection.getParsedTokenAccountsByOwner(address, {
        mint: new solanaWeb3.PublicKey(tokenMintAddress)
    });
}

async function fetchPrice() {
    const response = await axios.get("https://price.jup.ag/v6/price?ids=SOL");
    const price = response.data.data.SOL.price;
    return parseFloat(price.toFixed(2));
}
export { downloadTokensList, getTokens, getTokenAccounts };
