import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Col, Form, FormGroup, Label, Input, FormFeedback, Table } from 'reactstrap';
import * as Yup from 'yup';
import { store } from '../context/ProductProvider';
import AlertError from './AlertError';
import { useHistory } from "react-router-dom";


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
            console.log(values);
            await auth(values.address, values.password);


        },
    });
    return (

        <div className="login">
            <section>
                <div style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "2rem"
                }}>

                    <Form style={{ padding: "1rem", border: '2px solid #ccc', borderRadius: "4px", backgroundColor: "#f8f8f8" }} onSubmit={formik.handleSubmit}>
                        <AlertError error={error} />
                        <Col md={12} sm={12}>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input invalid={formik.errors.address ? true : false} id="address"
                                    name="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address} />
                                <FormFeedback invalid={"true"}>{formik.errors.address}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={12} sm={12}>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input invalid={formik.errors.password ? true : false} id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password} />
                                <FormFeedback invalid={"true"}>{formik.errors.password}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Button style={{ margin: "1rem" }} type="submit">Autenticar</Button>
                        <Button style={{ margin: "2rem" }} onClick={() => handleModal()}>Generar Clave</Button>
                    </Form>
                </div>
            </section>
            <section >
                {keypair.publicKey !== "" && <div className="table-responsive m-auto w-50 bg-white">
                    <Table bordered>
                        <tbody >

                            <tr >
                                <th >Address</th>
                                <td>{keypair.publicKey}</td>
                            </tr>
                            <tr >
                                <th >Password</th>
                                <td>{keypair.secretKey}</td>
                            </tr>
                            <tr >
                                <th >Información</th>
                                <td>Favor colocar dinero en la billetera en la siguiente direccion https://faucet.aepps.com/ </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>}
            </section>
        </div>

    )
}


