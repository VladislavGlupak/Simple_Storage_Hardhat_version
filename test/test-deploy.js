const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const { equal } = require("assert")

// Hardhat use Mocha fir testing
// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a current number 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    // it.only("Should...) -> run only this test
    // yarn hardhat grep test --grep store -> will run test with a word "store" in the name of the test
    it("Should update when we call store fuction", async function () {
        const expectedValue = "7"
        const updateValue = await simpleStorage.store(expectedValue)
        updateValue.wait(1)

        const updatedValue = await simpleStorage.retrieve()
        assert.equal(updatedValue.toString(), expectedValue)
        //expect(updatedValue.toString()).to.equal(expectedValue) - same thing
    })
})
