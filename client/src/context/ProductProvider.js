import React, { createContext, useReducer } from 'react';
import { reducer, initialState }  from '../store/reducers';
import * as ACTIONS from '../store/actions';
import { addWallet, authUser, crearCurso, consultarCursos, apiPagarCurso, ApiBuscarInscritos, apiAgregarCertificado, consultarCertificados } from '../Api/Api'

const initialStateContext = {};
const store = createContext(initialStateContext);
const { Provider } = store;



function ProductProvider(props) {


    const [state, dispatch] = useReducer(reducer, initialState);
  
    const createWallet = async () =>{
         const keypair= await addWallet();
         await dispatch({type: ACTIONS.CREAR_WALLET, payload: await keypair}) 
         await dispatch({type: ACTIONS.ERROR, payload: ""})  
    }

    const auth = async (address, privateKey) => {
        const response= await authUser(address, privateKey);
        if(response === "ok"){
            const user = {publicKey: address, privateKey:privateKey}
            await dispatch({type: ACTIONS.AUTENTICACION, payload: await user})
            await dispatch({type: ACTIONS.ERROR, payload: await ""})
            await dispatch({type: ACTIONS.IS_LOGGED, payload: await "on"})
        }else{
            await dispatch({type: ACTIONS.ERROR, payload: "Error de autenticacion"})
        }

    }

    const agregarCurso = async (curso) => {
        const response= await crearCurso(curso, localStorage.getItem('address'), localStorage.getItem('password'));
        if(response!=='error'){
            await dispatch({type: ACTIONS.AGREGAR_CURSO, payload: await response})          
        }else{
            await dispatch({type: ACTIONS.ERROR, payload: "Error de Conexion con la red blockchain"})
        }    
    }


    const pagarCurso = async (curso) => {
        console.log(curso);
        const response= await apiPagarCurso(curso, localStorage.getItem('address'), localStorage.getItem('password'));
        if(response!=='error'){
            await registroExitoso();        
        }else{
            await dispatch({type: ACTIONS.ERROR, payload: "Error de Conexion con la red blockchain"})
        }    
    }

    const agregarCertificado = async (certificado) => {
      
        const response= await apiAgregarCertificado(certificado);
        if(response!=='error'){
            await registroExitoso();        
        }else{
            await dispatch({type: ACTIONS.ERROR, payload: "Error de Conexion con la red blockchain"})
        }    
    }

    const registroExitoso = async () => {
        await dispatch({type: ACTIONS.REGISTRO_EXITOSO, payload: "Registro Exitoso"})
        
    } 

    const buscarCursos = async () => {
        const response= await consultarCursos(localStorage.getItem('address'), localStorage.getItem('password'));
        if(response!=='error'){
            await dispatch({type: ACTIONS.CONSULTAR_CURSOS, payload: await response})          
        }else{
            await dispatch({type: ACTIONS.ERROR, payload: "Error de Conexion con la red blockchain"})
        }    
    }

    const buscarCertificados = async () => {
        const response= await consultarCertificados(localStorage.getItem('address'), localStorage.getItem('password'));
        if(response!=='error'){
            await dispatch({type: ACTIONS.CONSULTAR_CERTIFICADOS, payload: await response})          
        }else{
            await dispatch({type: ACTIONS.ERROR, payload: "Error de Conexion con la red blockchain"})
        }    
    }

    const salirSistema = async () => {
        await dispatch({type: ACTIONS.SALIR})    
    }

    const buscarInscritos = async () => {
        const response= await ApiBuscarInscritos(localStorage.getItem('address'), localStorage.getItem('password'));
        if(response!=='error'){
            await dispatch({type: ACTIONS.CONSULTAR_INSCRITOS, payload: await response})          
        }else{
            await dispatch({type: ACTIONS.ERROR, payload: "Error de Conexion con la red blockchain"})
        }    
    }

    return (
        <Provider

            value={{
                dispatch,
                ...state,
                createWallet,
                auth, 
                agregarCurso,
                registroExitoso,
                buscarCursos,
                pagarCurso,
                buscarInscritos,
                agregarCertificado,
                buscarCertificados,
                salirSistema
                
            }}

        >
            {props.children}

        </Provider>
    )
}

//const ProductConsumer = ProductContext.Consumer;

export { store, ProductProvider }

