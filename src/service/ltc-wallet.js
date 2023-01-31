const bitcoin = require('bitcoinjs-lib')
const { ECPairFactory } = require('ecpair')
const ecc  = require('tiny-secp256k1')

const ECPair = ECPairFactory(ecc);


class LtcWallet {
    constructor({path}){
        this.keyPair = null
        this.path = path
        this.net = null
    }

    async generateAddressWallet() {
        await this.setLitecoinNet()
        await this.setKeyPair()
        
        const { address } = bitcoin.payments.p2pkh({
            pubkey: this.keyPair.publicKey,
            network: this.net,
          });

        return { address }
    }

    async setLitecoinNet() {
        const net = {
            messagePrefix: '\x19Litecoin Signed Message:\n',
            bech32: 'ltc',
            bip32: {
              public: 0x019da462,
              private: 0x019d9cfe,
            },
            pubKeyHash: 0x30,
            scriptHash: 0x32,
            wif: 0xb0,
          }
    
          this.net = net
      
    }

    async setKeyPair() {
        this.keyPair = ECPair.makeRandom({ network: this.net })
    }
}

module.exports = LtcWallet