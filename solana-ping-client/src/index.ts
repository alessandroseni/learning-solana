import web3 = require('@solana/web3.js')
import Dotenv from 'dotenv'
Dotenv.config()

async function main() {
    const payer = initializeKeypair()
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    await sendSol(connection, 0.1*web3.LAMPORTS_PER_SOL, web3.Keypair.generate().publicKey, payer)
}

function initializeKeypair(): web3.Keypair {
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
}

async function sendSol(connection: web3.Connection, amount: number, to: web3.PublicKey, sender: web3.Keypair) {
    const transaction = new web3.Transaction()

    const sendSolInstruction = web3.SystemProgram.transfer(
        {
            fromPubkey: sender.publicKey,
            toPubkey: to,
            lamports: amount,
        }
    )

    transaction.add(sendSolInstruction)

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [sender]
    )

    console.log(signature)
}

main().then(() => {
    console.log("Finished successfully")
}).catch((error) => {
    console.error(error)
})