const { Channel, Universal, TxBuilder: { unpackTx } } = require('@aeternity/aepp-sdk')
const { BigNumber } = require('bignumber.js')

const API_URL = 'http://192.168.0.108'
const INTERNAL_API_URL = 'http://192.168.0.108/internal'
const STATE_CHANNEL_URL = 'wss://192.168.0.108:3014/channel'
const NETWORK_ID = 'ae_uat'
const RESPONDER_HOST = 'localhost'
const RESPONDER_PORT = 3333

const initiatorAddress = 'ak_5M4QLCrTvdqSwa3xEXXft3kNYC9ZVDzhnTQUKdJKbiSYGqdeq'
const responderAddress = 'ak_vLdxPmfbTMvaepMRa54YY1cUtDDLBBM2L2AV4f8LtmagCVx1n'

let initiatorAccount
let responderAccount

async function createAccounts () {
  initiatorAccount = await Universal({
    networkId: NETWORK_ID,
    url: API_URL,
    internalUrl: INTERNAL_API_URL,
    keypair: {
      publicKey: initiatorAddress,
      secretKey: '3b03e84c6a2fc29d5419dbd1f99447bbe810157ef68a0d2ad60225c35148f3cd09de2574241b6b392f7df9d8adb8d771dbf7aad5b317ebd728171e730986c659'
    }
  })
  responderAccount = await Universal({
    networkId: NETWORK_ID,
    url: API_URL,
    internalUrl: INTERNAL_API_URL,
    keypair: {
      publicKey: responderAddress,
      secretKey: 'e90916c76de2bf0944141f43a23801807886c8dbf0be1669dd382683ec37bf49791c9bc79dc719730a46c6d4e3103ee5cf65937a45c1c7eaf670392cdc186332'
    }
  })
}

async function initiatorSign (tag, tx) {
    console.log('initiatior')
     console.log(tag)
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

async function responderSign (tag, tx, { updates } = {}) {
console.log('responder')
console.log(tag)
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

async function connectAsInitiator (params) {
  return Channel({
    ...params,
    url: STATE_CHANNEL_URL,
    role: 'initiator',
    sign: initiatorSign
  })
}

async function connectAsResponder (params) {
  return Channel({
    ...params,
    url: STATE_CHANNEL_URL,
    role: 'responder',
    sign: responderSign
  })
}

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

createAccounts().then(() => {
  // initiator connects to state channels endpoint
  connectAsInitiator(params).then(initiatorChannel => {
    
    initiatorChannel.on('statusChanged', (status) => {
        console.log(status);
      if (status === 'open') {
        console.log('State channel has been opened!')  
      }
    })

    initiatorChannel.on('onChainTx', (tx) => {
      console.log('channel_create_tx:', tx)
    })

    initiatorChannel.sendMessage('hello world', responderAddress)

    initiatorChannel.update(
      // Sender account
      initiatorAddress,
      // Recipient account
      responderAddress,
      // Amount
      10,
      // This function should verify offchain transaction
      // and sign it with initiator's private key
      async (tx) => initiatorAccount.signTransaction(tx)
    ).then((result) => {
      if (result.accepted) {
        console.log('Succesfully transfered 10 tokens!')
      } else {
        console.log('Transfer has been rejected')  
      }
    })
                                                       
    initiatorChannel.on('error', err => console.log(err))
  }).catch(err => {
    console.log('Initiator failed to connect')
    console.log(err)
  })

  // responder connects to state channels endpoint
  connectAsResponder(params).then(responderChannel => {
    responderChannel.on('message', (msg) => {
      console.log('Received message from:', msg.from)
      console.log(msg.info)
    })

    // close channel after a minute
    setTimeout(() => {
      console.log('Closing channel...')
      responderChannel.shutdown(
        // This function should verify shutdown transaction
        // and sign it with responder's secret key 
        async (tx) => responderAccount.signTransaction(tx)
      ).then((tx) => {
        console.log('State channel has been closed')
        console.log('You can track this transaction onchain', tx)
      }).catch(err => console.log(err))
    }, 60000)
                                                       
    responderChannel.on('error', err => console.log(err))
  }).catch(err => {
    console.log('Responder failed to connect')
    console.log(err)
  })
})