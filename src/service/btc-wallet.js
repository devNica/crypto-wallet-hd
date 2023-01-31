const bitcoin = require('bitcoinjs-lib')
const bip32 = require('bip32')

class BtcWallet {
    constructor({ path, seed }){
        this.root = null
        this.path = path
        this.nets = null
        this.seed = seed
    }

    async generateAddressWallet() {
        await this.setNets()
        await this.setRoot()

        const addrNode = this.root.derivePath(this.path)
        const node = addrNode.derive(0).derive(0)
        const address = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: this.nets.mainNet
        }).address

        return { address }
    }

    async setRoot() {
        this.root = bip32.fromSeed(seed, this.nets.mainNet)
    }


    async setNets() {
        const testNet = bitcoin.networks.testnet
        const mainNet = bitcoin.networks.bitcoin
        
        this.nets = { mainNet, testNet }
        
    }
}

module.exports = BtcWallet