const { Channel, Universal, TxBuilder: { unpackTx }, MemoryAccount, Node } = require('@aeternity/aepp-sdk')
const { BigNumber } = require('bignumber.js')

const API_URL = 'http://192.168.0.105:3013'
const INTERNAL_API_URL = 'http://192.168.0.105:3113'
const STATE_CHANNEL_URL = 'ws://192.168.0.105:3014/channel'
const NETWORK_ID = 'ae_uat'
const RESPONDER_HOST = '192.168.0.105'
const RESPONDER_PORT = 3333

const initiatorAddress = 'ak_2FyHpQaHPMHqWLZT2aZSnBPWZKyzFqBVv2VfSzRdJi8626BA2g'
const responderAddress = 'ak_trGPuJJCo2g1X6jTUkAooUoUd5G9zHxdvSDrBPso8Nf6ydVrk'


const DEPOSIT = 1000000000000000000
const params = {
  // Public key of initiator
  // (in this case `initiatorAddress` defined earlier)
  initiatorId: initiatorAddress,
  // Public key of responder
  // (in this case `responderAddress` defined earlier)
  responderId: responderAddress,
  // Initial deposit in favour of the responder by the initiator
  pushAmount: 0,
  // Amount of tokens initiator will deposit into state channel
  initiatorAmount: DEPOSIT,
  // Amount of tokens responder will deposit into state channel
  responderAmount: DEPOSIT,
  // Minimum amount both peers need to maintain
  channelReserve: 40000,
  // Minimum block height to include the channel_create_tx
  ttl: 1000,
  // Amount of blocks for disputing a solo close
  lockPeriod: 10,
  // Host of the responder's node
  host: RESPONDER_HOST,
  // Port of the responders node
  port: RESPONDER_PORT,
}




async function initiatorSign(tag, tx) {
  if (tag === 'initiator_sign') {
    return initiatorAccount.signTransaction(tx)
  }

  // Deserialize binary transaction so we can inspect it
  const { txType, tx: txData } = unpackTx(tx)
  if (tag === 'shutdown_sign_ack') {
    // Fee amount is splitted equally per participants
    const fee = BigNumber(txData.fee).div(2)
    if (
      txType === 'channelCloseMutual' &&
      // To keep things simple we manually check that
      // balances are correct (as a result of previous transfer update)
      BigNumber(txData.initiatorAmountFinal).plus(fee).eq(BigNumber(DEPOSIT).minus(10)) &&
      BigNumber(txData.responderAmountFinal).plus(fee).eq(BigNumber(DEPOSIT).plus(10))
    ) {
      return initiatorAccount.signTransaction(tx)
    }
  }
}

async function responderSign(tag, tx, { updates } = {}) {
  if (tag === 'responder_sign') {
    return responderAccount.signTransaction(tx)
  }

  // Deserialize binary transaction so we can inspect it
  const { txType, tx: txData } = unpackTx(tx)
  // When someone wants to transfer a tokens we will receive
  // a sign request with `update_ack` tag
  if (tag === 'update_ack') {
    // Check if update contains only one offchain transaction
    // and sender is initiator
    if (
      txType === 'channelOffChain' &&
      updates.length === 1 &&
      updates[0].op === 'OffChainTransfer' &&
      updates[0].from === initiatorAddress
    ) {
      return responderAccount.signTransaction(tx)
    }
  }
}



pago = async () => {
  try {
    const nodeInstance = await Node({ url: 'https://sdk-testnet.aepps.com', internalUrl: 'https://sdk-testnet.aepps.com' })
    const ACCOUNT = await MemoryAccount({ keypair: { secretKey: '0a8a5042846fc8bd32711f7a00953272b77cc6dc588c283a39721d4072048cca75bafc728d726c16f877d7846eb4ee19316438da03a573307584680d6042f2df', publicKey: 'ak_trGPuJJCo2g1X6jTUkAooUoUd5G9zHxdvSDrBPso8Nf6ydVrk' } })


    initiatorAccount = await Universal({
      compilerUrl: "https://compiler.aepps.com",
      nodes: [{ name: 'ae_uat', instance: nodeInstance }],
      accounts: [ACCOUNT],
      address: 'ak_trGPuJJCo2g1X6jTUkAooUoUd5G9zHxdvSDrBPso8Nf6ydVrk'
    })

    console.log(initiatorAccount);
    const ACCOUNT2 = await MemoryAccount({ keypair: { secretKey: '77b8b5446e5ada152f2f402d6bacd3f3a906262887d925e2a476fd2625a37109a5b040820f76293431e4676c83c2a6d189c4ffc8b232a247203929ca4afe552c', publicKey: 'ak_2FyHpQaHPMHqWLZT2aZSnBPWZKyzFqBVv2VfSzRdJi8626BA2g' } })

    responderAccount = await Universal({
      compilerUrl: "https://compiler.aepps.com",
      nodes: [{ name: 'ae_uat', instance: nodeInstance }],
      accounts: [ACCOUNT2],
      address: 'ak_2FyHpQaHPMHqWLZT2aZSnBPWZKyzFqBVv2VfSzRdJi8626BA2g'
    })
   /* console.log(responderAccount);
    const initiatorChannel = await Channel({
      ...params,
      url: STATE_CHANNEL_URL,
      role: 'initiator',
      sign: initiatorSign
    }).catch(err => console.log(err))
    console.log(initiatorChannel);
    const responderChannel = await Channel({
      ...params,
      url: STATE_CHANNEL_URL,
      role: 'responder',
      sign: responderSign
    }).catch(err => console.log(err))

    await initiatorChannel.update(
      // Sender account
      initiatorAddress,
      // Recipient account
      responderAddress,
      // Amount
      10,
      // This function should verify offchain transaction
      // and sign it with initiator's private key
      async (tx) => initiatorAccount.signTransaction(tx)
    )

    await responderChannel.shutdown(
      // This function should verify shutdown transaction
      // and sign it with responder's secret key 
      async (tx) => responderAccount.signTransaction(tx)
    )*/

    const canal = await Channel({
      url: 'ws://192.168.0.105:3014/channel',
      role: 'initiator',
      initiatorId: 'ak_2FyHpQaHPMHqWLZT2aZSnBPWZKyzFqBVv2VfSzRdJi8626BA2g',
      responderId: 'ak_trGPuJJCo2g1X6jTUkAooUoUd5G9zHxdvSDrBPso8Nf6ydVrk',
      initiatorAmount: 1e18,
      responderAmount: 1e18,
      pushAmount: 0,
      channelReserve: 0,
      ttl: 1000,
      host: '192.168.0.105',
      port: 3014,
      lockPeriod: 10,
      //async (tag,tx) => (initiatorAccount.signTransaction(tx))
    })
    console.log(canal);
  } catch (e) {
    console.log(e);
  }
}

pago();