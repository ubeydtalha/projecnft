import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Navbar from '../components/Navbar'
import Disconnected from '../components/Disconnected'

import { useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { connected } = useWallet()
  return (
    <div className={styles.container}>
      <Head>
        <title>ProjecNFT</title>
        <meta name="description" content="The NFT Collection for Buildoors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={connected ? "url(/bg.svg)" : "url(/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack
          w="full"
          h="calc(100vh)"
          justify="center"
        >
          {/* Navbar */}
          <Navbar />
          <Spacer />
          <Center>
            { /* If connected, the second view, otherwise the first */}
            {connected? <Connected /> :<Disconnected /> }
          </Center>

          <Spacer></Spacer>

          <Center>

            <Box marginBottom={4} color="white">
              <a
                href="https://twitter.com/LamaAuction"
                target="_blank"
                rel="noopener noreferrer"
              >
                built with @LamaAuction

              </a>


            </Box>

          </Center>

        </Stack>

      </Box>

    </div>
  )
}
