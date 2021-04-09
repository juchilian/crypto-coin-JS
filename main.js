const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, "2020/04/09", "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let rereCoin = new BlockChain();

console.log("Mining Block 1...");
rereCoin.addBlock(new Block(1, "2020/04/09", { amount: 4 }));
console.log("Mining Block 2...");
rereCoin.addBlock(new Block(2, "2020/04/09", { amount: 12 }));

// // Tampering
// rereCoin.chain[1].data = { amount: 100 };
// rereCoin.chain[1].hash = rereCoin.chain[1].calculateHash();

// // Check blockchain
// console.log(rereCoin);
// console.log('Is blockchain valid? ' + rereCoin.isChainValid());

