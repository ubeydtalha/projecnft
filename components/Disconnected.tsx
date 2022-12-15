import { FC, MouseEventHandler, useCallback } from "react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import {
    Button,
    Container,
    Heading,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react"

import { ArrowForwardIcon } from "@chakra-ui/icons"



const Disconnected: FC = () => {

    const modalState = useWalletModal()
    const { wallet, connect } = useWallet()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (event.defaultPrevented) {
                return
            }

            if (!wallet) {
                modalState.setVisible(true)
            } else {
                connect().catch((error) => {
                    console.error(error)
                })

            }}, [wallet, connect, modalState])
        



    return (
        <Container>
            <VStack spacing={20} align="center">
                <Heading color={"white"} as="h1" size={"3xl"} noOfLines={2} textAlign="center" > Mint your buildoor. Earn $BLD. Level up.</Heading>
                <Text>Connect your wallet to start minting</Text>
                <HStack>
                    <Button bgColor="accent" color="white" maxW="380px" onClick={handleClick} colorScheme="cyan" rightIcon={<ArrowForwardIcon />}>
                        Connect
                    </Button>
                </HStack>
            </VStack>
        </Container>
    )
}

export default Disconnected