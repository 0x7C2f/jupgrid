import axios from "axios";
import fs from "fs";
import readline from "readline";

import solanaWeb3 from "@solana/web3.js";

function delay(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function questionAsync(question) {
	return new Promise((resolve) => {
		rl.question(question, resolve);
	});
}

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

export {
	delay,
	downloadTokensList,
	getTokenAccounts,
	getTokens,
	questionAsync,
	rl
};
