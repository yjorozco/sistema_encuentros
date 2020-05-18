const { Universal: Ae, MemoryAccount, Node } = require('@aeternity/aepp-sdk')

const contract = `
contract Curso =

   record curso = { nombre: string, direccion: string, descripcion:string, fecha:string, hora:string, costo: string }
   
   record state = { cursos : map(int, curso), next_id : int }

   stateful entrypoint init() = { cursos = {}, next_id = 0 }

   entrypoint cursoExiste(next_id: int) : bool =
      Map.member(next_id, state.cursos)

   stateful entrypoint crearCurso( nombre: string, direccion: string, descripcion:string, fecha:string, hora:string, costo: string) =
      let curso = { nombre= nombre, direccion=direccion, descripcion=descripcion, fecha=fecha, hora=hora, costo=costo}
      put(state{cursos[state.next_id] = curso, next_id = (state.next_id + 1)})
      
   entrypoint getCursos() : map(int, curso) =
      state.cursos`


const contractAddress = 'ct_EuyMQYAvFUdfStMFsDCbTCjaJAyNsqaJtfCEhH1tXN3XY123u'

exports.crearCurso = async (req, res) => {

   try {

      const { address, privateKey } = req.body;
      const nodeInstance = await Node({ url: 'https://sdk-testnet.aepps.com', internalUrl: 'https://sdk-testnet.aepps.com' })
      const ACCOUNT = MemoryAccount({ keypair: { secretKey: privateKey, publicKey: address } })

      const sdkInstance = await Ae({
         compilerUrl: "https://compiler.aepps.com",
         nodes: [{ name: 'ae_uat', instance: nodeInstance }],
         accounts: [ACCOUNT],
         address: address
      })




      const { curso } = await req.body;


      console.log(curso);
      const contractObject = await sdkInstance.getContractInstance(contract, { contractAddress })
      const response = await contractObject.call('crearCurso', [curso.nombre, curso.direccion, curso.descripcion, curso.fecha, curso.hora, curso.costo])
      console.log(response);
  

      res.send("ok")
   } catch (e) {
      console.log(e);
      res.send("error")
   }



}

exports.consultarCursos = async (req, res) => {

   try {

      const { address, privateKey } = req.body;
      const nodeInstance = await Node({ url: 'https://sdk-testnet.aepps.com', internalUrl: 'https://sdk-testnet.aepps.com' })
      const ACCOUNT = MemoryAccount({ keypair: { secretKey: privateKey, publicKey: address } })

      const sdkInstance = await Ae({
         compilerUrl: "https://compiler.aepps.com",
         nodes: [{ name: 'ae_uat', instance: nodeInstance }],
         accounts: [ACCOUNT],
         address: address
      })

      const contractObject = await sdkInstance.getContractInstance(contract, { contractAddress })
      const response = await contractObject.call('getCursos', [])
      res.send(response.decodedResult)
   } catch (e) {
      console.log(e);
      res.send("error")
   }

}