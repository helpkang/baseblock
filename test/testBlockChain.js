const crypto = require('crypto')

class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
    toString(){
        return this.fromAddress+this.toAddress+this.amount
    }
}

class Block{
    constructor(timestamp, transactions, previousHash=''){
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        const dest = this.previousHash + this.timestamp + this.transactions.map(transaction=>transaction.toString()).join('')+this.nonce
        const hashFunc = crypto.createHash('sha256')
        const hash = hashFunc.update(dest).digest('hex')
        return hash
    }

    mineBlock(difficulty) {
        const difficultyStr = Array(difficulty+1).join('0')
        while(this.hash.substring(0, difficulty) !== difficultyStr){
            this.hash = this.calculateHash()
            this.nonce++
        }
    }
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 3
        this.pendingTransactions = []
        this.miningReward = 100
    }

    createGenesisBlock(){
        return new Block('01/01/2017', [], '0')
    }

    getLastBlock(){
        return this.chain.slice(-1).pop()
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty)
        this.chain.push(block)
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address){
        let balance = 0
        for(const block of this.chain) {
            for(const trans of block.transactions){
                
                if(trans.fromAddress === address) {
                    balance -= trans.amount
                }

                if(trans.toAddress === address){
                    balance += trans.amount
                }
            }
        }

        return balance
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1] 
            if(currentBlock.hash != currentBlock.calculateHash()) {
                return false
            }

            if(currentBlock.previousHash != previousBlock.hash) {
                return false
            }
        }
        return true
    }
}

let coin = new BlockChain()
coin.createTransaction(new Transaction('address1', 'address2', 100))
coin.createTransaction(new Transaction('address2', 'address1', 50))

console.log( 'Starting the miner..')
coin.minePendingTransactions('coin')
console.log('Balance of coin is', coin.getBalanceOfAddress('coin') )


console.log( 'Starting the miner2..')
coin.minePendingTransactions('coin')
console.log('Balance of coin is', coin.getBalanceOfAddress('coin') )

console.log('block chain')
console.log(JSON.stringify(coin, null, 4))

