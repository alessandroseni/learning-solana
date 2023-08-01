import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'


export const SendSolForm: FC = () => {
    const [txSig, setTxSig] = useState('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
    }

    const sendSol = event => {
        event.preventDefault()
        if (!connection || !publicKey) { return }
        const transaction = new web3.Transaction();
        const recipientPubKey = new web3.PublicKey(event.target.recipient.value);

        const sendSolInstruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPubKey,
            lamports: web3.LAMPORTS_PER_SOL * event.target.amount.value,
        })

        transaction.add(sendSolInstruction)
        sendTransaction(transaction, connection).then(sig => {
            setTxSig(sig)
        })

        console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
    }

    return (
        <div>
            {
                publicKey ? 
                    <form onSubmit={sendSol} className={styles.form}>
                        <label htmlFor="amount">Amount to send:</label>
                        <input id="amount" type="text" className={styles.formField} placeholder="0.4 SOL" required />
                        <br />
                        <label htmlFor="recipient">Send SOL to:</label>
                        <input id="recipient" type="text" className={styles.formField} placeholder="4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                        <button type="submit" className={styles.formButton}>Send</button>
                    </form> :
                    <span>Connect Your Wallet</span>
            }
            {
                txSig ?
                    <div>
                        <p>Transaction Signature: </p>
                        <a href={link()}>Solana Explorer</a>
                    </div> :
                    null
            }
        </div>
    )
}