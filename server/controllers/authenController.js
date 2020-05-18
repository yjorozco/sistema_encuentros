const { Universal: Ae, MemoryAccount, Node, Crypto } = require('@aeternity/aepp-sdk')






exports.generateAccount = async (req, res) => {
    try {
        const keypair = await Crypto.generateKeyPair()
        console.log(`Secret key: ${await keypair.secretKey}`)
        console.log(`Public key: ${await keypair.publicKey}`)
        return await res.json({
            keypair
        });
    } catch (e) {
        console.log(e);
    }

}

exports.auth = async (req, res) => {
    try {

        const { address, privateKey } = req.body;
        const nodeInstance = await Node({ url: 'https://sdk-testnet.aepps.com', internalUrl: 'https://sdk-testnet.aepps.com' })
        const ACCOUNT = MemoryAccount({ keypair: { secretKey:  privateKey, publicKey: address } })

        const sdkInstance = await Ae({
            compilerUrl: "https://compiler.aepps.com",
            nodes: [{ name: 'ae_uat', instance: nodeInstance }],
            accounts: [ACCOUNT],
            address: address
        })

        console.log("paso");
        res.send("ok")
    } catch (e) {
        console.log(e);
        res.send("error")
    }

}