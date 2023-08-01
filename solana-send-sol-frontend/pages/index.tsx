import Head from 'next/head'
import { NextPage } from 'next'
import { AppBar } from '../components/AppBar'
import { SendSolForm } from '../components/SendSolForm'
import { BalanceDisplay } from '../components/BalanceDisplay'
import WalletContextProvider from '../components/WalletContextProvider'
import styles from '../styles/Home.module.css'


const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <BalanceDisplay />
          <SendSolForm />
        </div>
      </WalletContextProvider>
    </div>
  );
}

export default Home;