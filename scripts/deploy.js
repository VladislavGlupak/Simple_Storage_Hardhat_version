// import
const { isCommunityResourcable } = require("@ethersproject/providers")
const { ethers, run, network } = require("hardhat") // import dependencies

// main script
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Contract is deployd at ${simpleStorage.address}`)

    // if we are on test network like Rinkeby
    // we need to verify our contract
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6) // wait 6 block after contract deployed
        console.log("Waiting for blocks creating...")
        await verify(simpleStorage.address, [])
    }

    // check current value
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is ${currentValue}`)

    // update current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Current value is ${updatedValue}`)
}

// verify contract
async function verify(contractAddress, args) {
    console.log("Verifying the contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("Already verified")) {
            console.log("Already verifies!")
        } else {
            console.log(e)
        }
    }
}

// call main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
