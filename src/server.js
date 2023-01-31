const express = require('express')
const walletRouter = require('./routes/wallet.router')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const { json, urlencoded } = express

const port = process.env.PORT || 8200


app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors({ origin: "*"}))

app.use('/wallet', walletRouter)

app.get('/', (req, res)=>{
    res.send({
        message: 'this is an api for crypto wallets'
    })
})

app.listen(port, ()=>console.log(`Server is running on port: ${port}`))