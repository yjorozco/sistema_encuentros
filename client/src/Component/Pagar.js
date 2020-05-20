import React, { useContext, useEffect, useState } from 'react';
import formik, { useFormik } from 'formik';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Row, Table } from 'reactstrap';
import * as Yup from 'yup';
import { store } from '../context/ProductProvider';
import AlertError from './AlertError';
import { useHistory } from "react-router-dom";
import HomeApp from './HomeApp';
import AlertSuccess from './AlertSuccess';
import Spinner from './Spinner';

const validationSchema = Yup.object().shape({
    Nombre: Yup.string()
        .required("Nombre requerido"),
    Fecha: Yup.string()
        .required("Fecha requerido"),
    Hora: Yup.string()
        .required("Hora requerido"),
    Costo: Yup.number().integer()
    .required("Costo requerido"),
});

export default function Pagar() {
    const { success, error, registroExitoso, pagarCurso } = useContext(store);
    const history = useHistory();
    const [start, setStart] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('is_logged') !== "on") {
            history.push("/");
        }
    }, [localStorage.getItem('is_logged')])

    const formik = useFormik({
        initialValues: {
            Nombre: '',
            Fecha: '',
            Hora: '',
            Costo:''
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {

            const curso = {
                nombre: values.Nombre,
                fecha: values.Fecha,
                hora: values.Hora,
                costo: values.Costo,

            }


            setStart(true)
           // let arrayCursos = pago;
           // arrayCursos.push(curso)
           await pagarCurso(curso)

           // SetCerrar(true)
            // await  pagarCurso(curso);

            if (!error) {
                await registroExitoso()
               await resetForm({})
            }


        },
    });


    return (
        <HomeApp>
           <Spinner start={start} setStart={setStart} formik={formik}/>
            <div style={{
              /*  display: "flexbox",
                display: "-webkit-box",
                display: "-moz-box",
                display: "-ms-flexbox",
                display: "-webkit-flex",*/
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "2rem",
            }}>
          
                    <Form onSubmit={formik.handleSubmit}>
                        <AlertSuccess success={success} />
                        <AlertError error={error} />
                      
                            <FormGroup>
                                <Label for="Nombre">Curso</Label>
                                <Input invalid={formik.errors.Nombre ? true : false} id="Nombre"
                                    name="Nombre"
                                    onChange={formik.handleChange}
                                    value={formik.values.Nombre} />
                                <FormFeedback invalid={"true"}>{formik.errors.Nombre}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="Fecha">Fecha</Label>
                                <Input type="date" invalid={formik.errors.Fecha ? true : false} id="Fecha"
                                    name="Fecha"
                                    onChange={formik.handleChange}
                                    value={formik.values.Fecha} />
                                <FormFeedback invalid={"true"}>{formik.errors.Fecha}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="Hora">Hora</Label>
                                <Input type="time" invalid={formik.errors.Hora ? true : false} id="Hora"
                                    name="Hora"
                                    onChange={formik.handleChange}
                                    value={formik.values.Hora} />
                                <FormFeedback invalid={"true"}>{formik.errors.Hora}</FormFeedback>
                            </FormGroup>
                    
                     
                            <FormGroup>
                                <Label for="Costo">Costo</Label>
                                <Input invalid={formik.errors.Costo ? true : false} id="Costo"
                                    name="Costo"
                                    onChange={formik.handleChange}
                                    value={formik.values.Costo} />
                                <FormFeedback invalid={"true"}>{formik.errors.Costo}</FormFeedback>
                            </FormGroup>
                     
                        
                            <Button type="submit">Confirmar</Button>                    
                      
                    </Form>
                         
            </div>

        </HomeApp>
    )
}
