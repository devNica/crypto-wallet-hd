
class EthWallet {
    constructor({ root, path }){
        this.root = root
        this.path = path
    }

    async generateAddressWallet() {
        const addrNode = this.root.derivePath(this.path)
        const address = addrNode.getWallet().getChecksumAddressString()
        return { address }
    }
}

module.exports = EthWallet