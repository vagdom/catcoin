const SHA256 = require('crypto-js/sha256')


class Block {
    /**
     * @param {number} index
     * @param {number} timestamp
     * @param {string} data
     * @param {string} previousHash
     */
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    showBlock() {
        console.log('Block index: ' + this.index);
        console.log('Block timestamp: ' + this.timestamp);
        console.log('Block data: ' + this.data);
        console.log('Block previousHash: ' + this.previousHash);
        console.log('Block hash: ' + this.hash);
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            //console.log('Nonce: ' + this.nonce);
            this.hash = this.calculateHash();
        }

        console.log('Block Mined: ' + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "05/04/2022", "Genesis Block", 0);
    }

    getLatestBlock() {
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    showBlockchain() {
        for (const i in this.chain) {
            console.log('Index : ' + this.chain[i].index);
            var d = Date(this.chain[i].timestamp);
            const a = d.toString();
            console.log('Created : ' + a);
            console.log('Value : ' + this.chain[i].data);
            console.log('Previous : ' + this.chain[i].previousHash);
            console.log('Hash : ' + this.chain[i].hash);
            console.log();
        }
    }
}

console.log('Begin Process...');
let catCoin = new Blockchain();
catCoin.addBlock(new Block(1, Date.now(), { amount: 100 } ));
catCoin.addBlock(new Block(2, Date.now(), { amount: 200 } ));
catCoin.addBlock(new Block(3, Date.now(), { amount: 300 } ));
catCoin.addBlock(new Block(4, Date.now(), { amount: 400 } ));

//console.log(JSON.stringify(catCoin, null, 4));
catCoin.showBlockchain();