import React, { useContext, useEffect } from 'react';
import { store } from '../context/ProductProvider';
import { useHistory } from "react-router-dom";


export default function Salir() {
    const { salirSistema } = useContext(store);


    const history = useHistory();


    useEffect(() => {

        salirSistema()
        history.push("/");

    }, [])



    return (
        <>

        </>
    )
}