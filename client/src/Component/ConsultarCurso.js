import React, { useContext, useEffect, useState } from 'react';
import HomeApp from './HomeApp'
import { store } from '../context/ProductProvider';
import TablaCurso from './TablaCurso';
import AlertError from './AlertError';
import { Spinner } from 'reactstrap';
import { useHistory } from "react-router-dom";

export default function ConsultarCurso() {
    const { error, cursos, buscarCursos, is_logged } = useContext(store);
    const history = useHistory();

    
    useEffect(() => {
        if (localStorage.getItem('is_logged') !== "on") {
             history.push("/");
        }
    }, [localStorage.getItem('is_logged')])
    
    useEffect(() => {
        if(cursos.length <=0 ){
            buscarCursos();           
        }
  
    }, [cursos])

    return (
        <HomeApp>
        <div style={{
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "3rem",
                width: "100%"
            }}>
            <AlertError error={error} />
            </div>
            <div style={{
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5rem",
                width: "100%"
            }}>
               
                {cursos!=undefined&& cursos.length<=0?<Spinner color="primary" />:<TablaCurso data={cursos} />}
            </div>
        </HomeApp>
    )
}
