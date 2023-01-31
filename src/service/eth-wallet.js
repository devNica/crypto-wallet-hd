const { hdkey } = require('ethereumjs-wallet')

class EthWallet {
    constructor({ path, seed }){
        this.root = null
        this.path = path
        this.seed = seed
    }

    async generateAddressWallet() {

        await this.setRoot()

        const addrNode = this.root.derivePath(this.path)
        const address = addrNode.getWallet().getChecksumAddressString()
        return { address }
    }

    async setRoot() {
        this.root = hdkey.fromMasterSeed(this.seed)
    }
}

module.exports = EthWallet