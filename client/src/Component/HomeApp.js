import React, { useContext, useEffect } from 'react';
import { store } from '../context/ProductProvider';
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';
import { Col,Row } from 'reactstrap';

export default function HomeApp({ children }) {
    const { is_logged } = useContext(store);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('is_logged') === "off") {
            history.push('/')
        }

    }, [localStorage.getItem('is_logged')])

    return (
        <>
            <NavBar />  
            {children}
            <Footer >
                <Row className="d-flex">
                    <Col md={4} className="text-center" > @CNTI 2020 </Col>
                    <Col md={4} className="text-center"></Col>
                    <Col md={4} className="text-center" > Desarrollado por GTO</Col>
                </Row>
            </Footer>
        </>
    )
}
