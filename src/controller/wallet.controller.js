const bip39 = require('bip39')
const bip32 = require('bip32')
const { hdkey } = require('ethereumjs-wallet')
const bitcoin = require('bitcoinjs-lib')
const EthWallet = require('../service/eth-wallet')
const BtcWallet = require('../service/btc-wallet')

const paths = {
    ethereum: "m/44'/60'/0'/0/0",
    bitcoin: "m/44'/0'/0'/0/0"
}

const walletStrategies = {}

walletStrategies['ethereum'] = EthWallet
walletStrategies['bitcoin'] = BtcWallet

class WalletFactory {

    constructor() {}

    static getStrategy(strategy, props) {
        const { mnemonic } = props
        const w = initializeEnviroment(mnemonic, strategy)
        return new walletStrategies[strategy]({ ...w })
    } 
    
    getMnemonic() {
        return { mnemonic: bip39.generateMnemonic() }
    }
}

function initializeEnviroment(mnemonic, strategy) {
    seed = bip39.mnemonicToSeedSync(mnemonic)
    if (strategy === 'ethereum') {
        const root = hdkey.fromMasterSeed(seed)
        return { root, nets: {}, path: paths[strategy] }
    } else if (strategy === 'bitcoin') {
        const nets = getNets()
        const root = bip32.fromSeed(seed, nets.mainNet)
        return { root, nets, path: paths[strategy] }
    }
}

 function getNets() {
    testNet = bitcoin.networks.testnet
    mainNet = bitcoin.networks.bitcoin

    return { nets: { testNet, mainNet } }
}


module.exports = WalletFactory