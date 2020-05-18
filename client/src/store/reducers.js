import * as ACTIONS from './actions';


export const initialState = {
    keypair: {
        publicKey: "",
        secretKey: ""
    },
    user: {
        publicKey: "",
        secretKey: ""
    },
    error: "",
    is_logged: "off",
    cursos: [],
    success: "",
    inscritos: [],
    certificados: []
};


export const reducer = (state, action) => {
    const { payload } = action;

    switch (action.type) {
        case ACTIONS.CREAR_WALLET:
            return { ...state, keypair: payload };
        case ACTIONS.AUTENTICACION:
            localStorage.setItem('address', payload.publicKey);
            localStorage.setItem('password', payload.privateKey);
            localStorage.setItem('is_logged', 'on');
            return { ...state, user: payload };
        case ACTIONS.ERROR:
            return { ...state, error: payload };
        case ACTIONS.IS_LOGGED:
            return { ...state, is_logged: payload };
        case ACTIONS.AGREGAR_CURSO:
            return { ...state, cursos: [...state.cursos, payload] };
        case ACTIONS.REGISTRO_EXITOSO:
            return { ...state, success: payload }
        case ACTIONS.CONSULTAR_CURSOS:
            return { ...state, cursos: payload }
        case ACTIONS.CONSULTAR_INSCRITOS:
            return { ...state, inscritos: payload}
        case ACTIONS.CONSULTAR_CERTIFICADOS:
            return { ...state, certificados:  payload }
        case ACTIONS.SALIR:
            console.log('paso');
            localStorage.clear();
        default:
            return state;
    }
};