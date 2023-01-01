import type { NextPage } from "next"
import Disconnected from "../components/Disconnected"
import Connected from "../components/Connected"
import { useWallet } from "@solana/wallet-adapter-react"
import MainLayout from "../components/MainLayout"

const Home: NextPage = () => {
  const { connected } = useWallet()

  return (
    <div>
    <MainLayout> {connected ? <Connected /> : <Disconnected />}</MainLayout>
    </div>
  )
}

export default Home