const { BlockChain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "95910ca4d68b9567b7843a9648168b3295145536bccdc3d26c1930fa1456793d"
);
const myWalletAddress = myKey.getPublic("hex");

let rereCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'publick key goes here', 10);
tx1.signTransaction(myKey);
rereCoin.addTransaction(tx1);

console.log("\n Starting the miner...");
rereCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\n Balance of ren is",
  rereCoin.getBalanceOfAddress(myWalletAddress)
);

console.log('Is chain valid?', rereCoin.isChainValid());

// Tampering
rereCoin.chain[1].transactions[0].amount = 1;

// // Check blockchain
console.log('Is blockchain valid? ', rereCoin.isChainValid());
