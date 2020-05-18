import React, { useContext, useEffect, useState } from 'react';
import HomeApp from './HomeApp'
import { store } from '../context/ProductProvider';
import TablaAlumno from './TablaAlumno';
import AlertError from './AlertError';
import { Spinner } from 'reactstrap';
import { useHistory } from "react-router-dom";

export default function Inscrito() {
    const { error, inscritos, buscarInscritos, is_logged } = useContext(store);
 
    const history = useHistory();


    useEffect(() => {
        if (localStorage.getItem('is_logged') !== "on") {
             history.push("/");
        }
    }, [localStorage.getItem('is_logged')])

    useEffect(() => {
        if(inscritos.length <=0 ){
            buscarInscritos();           
        } 
  
    }, [inscritos])

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
               
                {inscritos!=undefined&& inscritos.length<=0?<Spinner color="primary" />:<TablaAlumno data={inscritos} />}
            </div>
        </HomeApp>
    )
}
