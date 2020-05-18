//const IPFS = require('ipfs')
const ipfsClient = require('ipfs-http-client')
const { Universal: Ae, MemoryAccount, Node } = require('@aeternity/aepp-sdk')
const contract = `
contract File=
  record file ={
    id:int,
    name:string,
    description:string,
    createdAt:int,
    updatedAt:int,
    author:address,
    file_hash:string}
  record state ={
      index_counter:int,
      files:map(int,file)}
  entrypoint init()={
    index_counter=0,
    files={}}
  entrypoint getFileLength():int=
    state.index_counter
  stateful entrypoint add_file(_name:string,_description:string,_hash :string) =
   let stored_file = {id=getFileLength() + 1,name=_name,description=_description, createdAt=Chain.timestamp,updatedAt=Chain.timestamp,author = Call.caller,file_hash=_hash}
   let index = getFileLength() + 1
   put(state{files[index]=stored_file,index_counter=index})
  
  entrypoint get_file_by_index(index:int) : file = 
   switch(Map.lookup(index, state.files))
     None => abort("Product does not exist with this index")
     Some(x) => x 

  entrypoint getFiles():map(int,file) = 
     state.files
`
const contractAddress = 'ct_gVnBsVmi4sKEdEQ1cvgNYrnWQ3kTkehjfFGGbW7hSBEywTi78'

var fileListArr = [] // empty arr
var fileListLength = 0 // empty product list lenghth




exports.uploadFile = async (req, res) => {

  let id = null;
  let node = null;
  // let fileListArr = [];


  try {

    const { address, privateKey, descripcion } = req.body;

    const { fileData } = req.files;

    const nodeInstance = await Node({ url: 'https://sdk-testnet.aepps.com', internalUrl: 'https://sdk-testnet.aepps.com' })
    const ACCOUNT = await MemoryAccount({ keypair: { secretKey: privateKey, publicKey: address } })

    const sdkInstance = await Ae({
      compilerUrl: "https://compiler.aepps.com",
      nodes: [{ name: 'ae_uat', instance: nodeInstance }],
      accounts: [ACCOUNT],
      address: address
    })


    node = await ipfsClient({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      // headers: {
      //   authorization: 'Bearer ' + TOKEN
      // }
    })
    const Buffer = await ipfsClient.Buffer
    console.log(fileData);
    console.log(descripcion);
    for await (const file of await node.add(
      {
        path: fileData.name,
        content: new Buffer.from(fileData.data)
      }

    )) {
      id = await file.cid.toString();
    }

    const contractObject = await sdkInstance.getContractInstance(contract, { contractAddress })
    const callResult = await contractObject.call('add_file', [fileData.name, descripcion, id])

  } catch (err) {
    console.log(err);
    // await node.stop()
    return await res.status(400).send(err.message);
  }

  // await node.stop()
  await res.send('ok');
}


/*exports.downloadFile =  async (req, res) => {
    try{
     const node = await IPFS.create()
     const data =  Buffer.concat(await all(node.cat(req.params.id)))
     await node.stop()
     res.contentType("application/pdf");
     res.send(data);
    }catch(err){
        return res.status(400).send(err.message);
    }
}*/


exports.certificado = async (req, res) => {

  try {

    const { address, privateKey } = req.body;
    console.log('paso');
    console.log(address, privateKey)
    const nodeInstance = await Node({ url: 'https://sdk-testnet.aepps.com', internalUrl: 'https://sdk-testnet.aepps.com' })
    const ACCOUNT = MemoryAccount({ keypair: { secretKey: privateKey, publicKey: address } })

    const sdkInstance = await Ae({
      compilerUrl: "https://compiler.aepps.com",
      nodes: [{ name: 'ae_uat', instance: nodeInstance }],
      accounts: [ACCOUNT],
      address: address
    })

    const contractObject = await sdkInstance.getContractInstance(contract, { contractAddress })
    const response = await contractObject.call('getFiles', [])
    console.log(response);
    res.send(response.decodedResult)
  } catch (e) {
    console.log(e.message);
    res.send("error")
  }
}

