import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Col, Form, FormGroup, Label, Input, FormFeedback, Table } from 'reactstrap';
import * as Yup from 'yup';
import { store } from '../context/ProductProvider';
import AlertError from './AlertError';
import { useHistory } from "react-router-dom";
import logo from '../images/aeternity.png'
import Spinner from './Spinner';

const validationSchema = Yup.object().shape({
    address: Yup.string()
        .required("direccion requerido")
        .min(3, "direccion debe ser mayor que 3 cara")
        .max(100, "direccion debe ser menor que 50 caracteres"),
    password: Yup.string()
        .required("password requerido")
        .min(3, "password debe ser mayor que 3 cara")
        .max(200, "password debe ser menor que 100 caracteres"),
});


export default function Home() {
    const { is_logged, keypair, error, createWallet, auth } = useContext(store);
    const [toggle, setToggle] = useState(false)
    const history = useHistory();
    const [ start, setStart ] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('is_logged') !== "on") {
            history.push("/");
        }
    }, [localStorage.getItem('is_logged')])


    const handleModal = async () => {
        await createWallet();
        setToggle(true)
    }

    useEffect(() => {
        if (is_logged === "on") {
            history.push("/home");
        }
    }, [history, is_logged])

    const formik = useFormik({
        initialValues: {
            address: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setStart(true);
            await auth(values.address, values.password);


        },
    });
    return (
        <>

        <Spinner start={start} setStart={setStart} formik={formik}/> 
        
        <div className="login">
        
            <section>
                <div style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    //margin: "2rem auto -1rem auto",
                    padding: 0,
                    position: "static"
                }}>
                    <img src={logo} height="50" width="50" />

                </div>
                <div style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0.5rem auto -5rem auto",
                    padding: 0,
                    position: "static"
                }}>
                    <img src={logo} height="80rem" width="140rem" alt="Sistema de Encuentros" />

                </div>
            </section>

            <section>

                <div style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "1rem auto auto auto",
                   // position: "static"
                }}>
            

                    <Form style={{ padding: "1rem", border: '2px solid #ccc', borderRadius: "4px", backgroundColor: "#f8f8f8" }} onSubmit={formik.handleSubmit}>
                        <AlertError error={error} />
                        
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input invalid={formik.errors.address ? true : false} id="address"
                                    name="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address} />
                                <FormFeedback invalid={"true"}>{formik.errors.address}</FormFeedback>
                            </FormGroup>
                      
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input invalid={formik.errors.password ? true : false} id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password} />
                                <FormFeedback invalid={"true"}>{formik.errors.password}</FormFeedback>
                            </FormGroup>
                   
                        <Button style={{ margin: "1rem" }} type="submit">Autenticar</Button>
                        <Button style={{ margin: "2rem" }} onClick={() => handleModal()}>Generar Clave</Button>
                    </Form>
                </div>
            </section>
            <section >
                {keypair.publicKey !== "" && <div className=" pt-1 table-responsive m-auto w-70 text-white">
                    <Table bordered>
                        <tbody >

                            <tr  >
                                <th style={{ width: "1rem", color: "white" }}>Address</th>
                                <td style={{ width: "5rem", color: "white" }}>{keypair.publicKey}</td>
                            </tr>
                            <tr >
                                <th style={{ width: "1rem", color: "white" }} >Password</th>
                                <td style={{ width: "5rem", color: "white" }}>{keypair.secretKey}</td>
                            </tr>
                            <tr >
                                <th style={{ width: "1rem", color: "white" }} >Información</th>
                                <td style={{ width: "5rem", color: "white" }}>Favor colocar dinero en la billetera en la siguiente direccion https://faucet.aepps.com/ </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>}
            </section>
        </div>
        </>

    )
}


