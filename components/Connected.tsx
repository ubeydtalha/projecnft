
import {
    Button,
    Container,
    Heading,
    VStack,
    Text,
    HStack,
    Image,
} from "@chakra-ui/react"
import {
    FC,
    MouseEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react"
import { PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
    Metaplex,
    walletAdapterIdentity,
    CandyMachine,
} from "@metaplex-foundation/js"
import { useRouter } from "next/router"

const Connected: FC = () => {
    const { connection } = useConnection()
    const walletAdapter = useWallet()
    const [candyMachine, setCandyMachine] = useState<CandyMachine | null>()
    const [isMinting, setIsMinting] = useState(false)

    const metaplex: Metaplex = useMemo(() => {
        console.log("usememıo");
        
        return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
    }, [connection, walletAdapter])

    useEffect(() => {
        if (!metaplex) return
        console.log("meta");
        
        metaplex
          .candyMachines()
          .findByAddress({
            address: new PublicKey("EG9KsULnXSZncacDah2UrDbz9seWHRwa39nJhUuaNDsX"),
          })
          
          .then((candyMachine) => {
            console.log(candyMachine)
            // setCandyMachine(candyMachine)
          })
          .catch((error) => {
            console.log(error)
          })
      }, [metaplex])

    const router = useRouter()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
            if (event.defaultPrevented) return

            if (!walletAdapter.connected || !candyMachine) {
                return
            }
            if (walletAdapter.publicKey === null) {
                alert("Public key is not available")
                return
              }
            
              
            console.log("handleclick");
            

            try {
                setIsMinting(true)
                const nft = await metaplex.candyMachines().mint({
                    candyMachine: candyMachine,
                    collectionUpdateAuthority: walletAdapter.publicKey,
                    // mintSettings: walletAdapter.publicKey,
                }).then((res) => res)

                console.log(nft)
                router.push(`/newMint?mint=${nft.nft.address.toBase58()}`)
            } catch (error) {
                console.log("ERROR ", error)
                alert(error)
            } finally {
                setIsMinting(false)
            }
        },
        [metaplex, walletAdapter, candyMachine]
    )

    return (
        <div>
        <VStack spacing={20}>
            <Container>
                <VStack spacing={8}>
                    <Heading
                        color="white"
                        as="h1"
                        size="2xl"
                        noOfLines={1}
                        textAlign="center"
                    >
                        Welcome Buildoor.
                    </Heading>

                    <Text color="bodyText" fontSize="xl" textAlign="center">
                        Each buildoor is randomly generated and can be staked to receive
                        <Text as="b"> $BLD</Text>. Use your <Text as="b"> $BLD</Text> to
                        upgrade your buildoor and receive perks within the community!
                    </Text>
                </VStack>
            </Container>

            <HStack spacing={10}>
                <Image src="avatar1.png" alt="" />
                <Image src="avatar2.png" alt="" />
                <Image src="avatar3.png" alt="" />
                <Image src="avatar4.png" alt="" />
                <Image src="avatar5.png" alt="" />
            </HStack>

            <Button
                bgColor="accent"
                color="white"
                maxW="380px"
                onClick={handleClick}
                isLoading={isMinting}
            >
                <Text>mint buildoor</Text>
            </Button>
        </VStack>
        </div>
    )
}

export default Connected