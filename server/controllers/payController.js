const { Universal: Ae, MemoryAccount, Node } = require('@aeternity/aepp-sdk')
//const StateChannel = require('../utils/stateChannel')


const contract = `

include "List.aes"

contract InscritosCurso =
   
   record inscrito = {nombre: string, fecha: string, hora: string, costo: string, identificador : address}

   record state = { inscritos: list(inscrito) }

   stateful entrypoint init() = { inscritos = []}

   stateful entrypoint addCurso(nombre: string, fecha: string, hora: string, costo: string, identificador : address) =
      let alumno = {nombre = nombre, fecha = fecha, hora = hora, costo = costo, identificador = identificador}
      let total = state.inscritos
      put(state{ inscritos = alumno::total})
   entrypoint totalAlumnos():list(inscrito)  = 
     state.inscritos

`

const contractAddress = 'ct_2PpmqYUAiYjiYL9oPgAyj51yMZTdkXLo5anRz5wVmy9MsdDLm4'

exports.payment = async (req, res) => {

  const { curso, address, privateKey } = req.body;
  try {
    const nodeInstance = await Node({ url: 'https://sdk-testnet.aepps.com', internalUrl: 'https://sdk-testnet.aepps.com' })
    const ACCOUNT = MemoryAccount({ keypair: { secretKey: privateKey, publicKey: address } })

    const sdkInstance = await Ae({
      compilerUrl: "https://compiler.aepps.com",
      nodes: [{ name: 'ae_uat', instance: nodeInstance }],
      accounts: [ACCOUNT],
      address: address
    })


    const height = await sdkInstance.height() // get top block height
    console.log('Current Block Height:', height)

    await sdkInstance.spend(curso.costo, 'ak_5M4QLCrTvdqSwa3xEXXft3kNYC9ZVDzhnTQUKdJKbiSYGqdeq') // spend one AE

    const contractObject = await sdkInstance.getContractInstance(contract, { contractAddress })
    await contractObject.call('addCurso', [curso.nombre, curso.fecha, curso.hora, curso.costo, address])


  } catch (e) {
    console.log(e);
    await res.send('Error de Conexion con la red');
  }
  await res.send('curso pagado');
}



exports.listaAlumnos = async (req, res) => {
  const { address, privateKey } = req.body;
  console.log(req.body)
  try {
    const nodeInstance = await Node({ url: 'https://sdk-testnet.aepps.com', internalUrl: 'https://sdk-testnet.aepps.com' })
    const ACCOUNT = MemoryAccount({ keypair: { secretKey: privateKey, publicKey:  address } })

    const sdkInstance = await Ae({
      compilerUrl: "https://compiler.aepps.com",
      nodes: [{ name: 'ae_uat', instance: nodeInstance }],
      accounts: [ACCOUNT],
      address:  address
    })
    const contractObject = await sdkInstance.getContractInstance(contract, { contractAddress })
    //await contractObject.call('addCurso', [req.body.nombre,req.body.cedula, req.body.curso, req.body.fecha ])
    const alumnoList = await contractObject.call('totalAlumnos');
    return await res.send(alumnoList.decodedResult)
    //await res.send('curs pagado');
  } catch (e) {
    console.log(e);
    await res.send('Error de Conexion con la red');
  }

}


