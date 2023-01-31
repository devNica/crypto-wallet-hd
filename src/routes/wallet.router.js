const { Router } = require("express");
const WalletFactory = require("../controller/wallet.controller");


const walletRouter = Router()

walletRouter.get('/mnemonic', async (req, res) => {
    const wallet = new WalletFactory()
    const { mnemonic } = wallet.getMnemonic()
    res.json({ mnemonic }).status(200)
})

walletRouter.post('/eth', async (req, res) => {
    try {
        const { mnemonic } = req.body
        const walletFactory = WalletFactory.getStrategy('ethereum', {mnemonic})
        const { address } = await walletFactory.generateAddressWallet()
        res.status(201).json({address})
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

})

walletRouter.post('/btc', async (req, res) => {
    try {
        const { mnemonic } = req.body
        const walletFactory = WalletFactory.getStrategy('bitcoin', {mnemonic})
        const { address } = await walletFactory.generateAddressWallet()
        console.log('address: ', address)
        res.status(201).json({address})
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

})

module.exports = walletRouter