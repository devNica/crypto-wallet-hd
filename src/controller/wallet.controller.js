const bip39 = require('bip39')
const EthWallet = require('../service/eth-wallet')
const BtcWallet = require('../service/btc-wallet')
const LtcWallet = require('../service/ltc-wallet')


const paths = {
    ethereum: "m/44'/60'/0'/0/0",
    bitcoin: "m/44'/0'/0'/0/0",
    dash: "m/44'/5'/0'/0/0 ",
    cardano: "m/44'/1815'/0'/0/0",
    doge: "m/44'/3'/0'/0/0",
    litecoin: "m/44'/2'/0'/0/0",
    tron: "m/44'/195'/0'/0'/0'",
    solana: "m/44'/501'/0'/0/0",
    polygon: "m/44'/60'/0'/0/0",
    fantom: "m/44'/60'/0'/0/0",
    binance_smart_chain: "m/44'/60'/0'/0/0",
    avalanche: "m/44'/60'/0'/0/0",
    ethereum_classic: "m/44'/61'/0'/0/0",
    ravencoin: "m/44'/175'/0'/0'/0'"

}

const walletStrategies = {}

walletStrategies['ethereum'] = EthWallet
walletStrategies['bitcoin'] = BtcWallet
walletStrategies['litecoin'] = LtcWallet

class WalletFactory {

    constructor() {}

    static getStrategy(strategy, props) {
        const { mnemonic } = props
        const w = getAddressPath(mnemonic, strategy)
        return new walletStrategies[strategy]({ ...w })
    } 
    
    getMnemonic() {
        return { mnemonic: bip39.generateMnemonic() }
    }
}

function getAddressPath(mnemonic, strategy) {
    seed = bip39.mnemonicToSeedSync(mnemonic)
    if (strategy === 'ethereum') {
        return { path: paths[strategy], seed }
    } else if (strategy === 'bitcoin') {
        return { path: paths[strategy], seed }
    } else if(strategy === 'litecoin') {
        return { path: paths[strategy] }
    }
}


module.exports = WalletFactory