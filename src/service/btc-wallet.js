const bitcoin = require('bitcoinjs-lib')

class BtcWallet {
    constructor({root, path, nets}){
        this.root = root
        this.path = path
        this.nets = nets
    }

    async generateAddressWallet() {
        const addrNode = this.root.derivePath(this.path)
        const node = addrNode.derive(0).derive(0)

        const address = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: this.nets.mainNet
        }).address

        return { address }
    }
}

module.exports = BtcWallet