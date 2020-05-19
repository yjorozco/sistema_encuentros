import axios from 'axios';


export const addWallet = async () => {

    try {
        const keypair = await axios.post('/auth/generateAccount');
        return await keypair.data.keypair;
    } catch (e) {
        return await e;
    }

}


export const authUser = async (address, privateKey) => {

    try {
        const response = await axios.post('/auth/auth', {
            address: address,
            privateKey: privateKey
        });
        return  response.data;
    } catch (e) {
        return await e;
    }

}



export const crearCurso = async (curso, address, privateKey) => {

    try {
        const response = await axios.post('/course/agregarcursos', {
            address: address,
            privateKey: privateKey,
            curso
        });
        console.log(response);
        return  response.data;
    } catch (e) {
        return await e;
    }

    
}

export const consultarCursos = async ( address, privateKey) => {

    try {
        const response = await axios.post('/course/consultarCursos', {
            address: address,
            privateKey: privateKey,
        });
        console.log(response);

        return  response.data.map(x => {
            return x[1];
        });

    } catch (e) {
        return await e;
    }

}


export const apiPagarCurso = async (curso, address, privateKey) => {
    console.log(curso);
    try {
        const response = await axios.post('/course/payment ', {
            address: address,
            privateKey: privateKey,
            curso
        });
        console.log(response);
        return  response.data;
    } catch (e) {
        return await e;
    }
}


export const ApiBuscarInscritos = async (address, privateKey) => {

    try {
        const response = await axios.post('/course/inscritos', {
            address: address,
            privateKey: privateKey,
        
        });
        console.log(response);
        return  response.data;
    } catch (e) {
        return await e;
    }

}




export const apiAgregarCertificado = async (certificado) => {


    try {

        const response = await axios.post('/file/uploadFile',  certificado);
        console.log(response);
        return  response.data;
    } catch (e) {
        return await e;
    }
}


export const consultarCertificados = async ( address, privateKey) => {

    try {
        const response = await axios.post('/file/certificados', {
            address: address,
            privateKey: privateKey,
        });
        console.log(response.data);

        return  response.data.map(x => {
            console.log(x[1]);
            x[1].file_hash = "https://ipfs.io/ipfs/"+x[1].file_hash
            return x[1];
        });

    } catch (e) {
        return await e;
    }

}