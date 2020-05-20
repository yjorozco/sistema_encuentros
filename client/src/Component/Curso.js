import React, { useContext,  useEffect, useState } from 'react';
import formik, { useFormik } from 'formik';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';
import { store } from '../context/ProductProvider';
import AlertError from './AlertError';
import { useHistory } from "react-router-dom";
import HomeApp from './HomeApp';
import AlertSuccess from './AlertSuccess';
import Spinner from './Spinner';

const validationSchema = Yup.object().shape({
    Nombre: Yup.string()
        .required("nombre requerido"),
    Fecha: Yup.string()
        .required("Fecha requerido"),
    Hora: Yup.string()
        .required("Hora requerido"),
    Direccion: Yup.string()
        .required("Fecha requerido"),
    Descripcion: Yup.string()
        .required("Fecha requerido"),
    Costo: Yup.string()
        .required("Fecha requerido"),
});


export default function Curso() {
    const { success, agregarCurso, error, registroExitoso } = useContext(store);
    const history = useHistory();
    const [ start, setStart ] = useState(false);
  
 


    

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
            Direccion: '',
            Descripcion: '',
            Costo: '',
        },
        validationSchema,
        onSubmit: async (values, {resetForm}) => {

            const curso = {
                nombre: values.Nombre,
                fecha: values.Fecha,
                hora: values.Hora,
                direccion: values.Direccion,
                descripcion: values.Descripcion,
                costo: values.Costo
            }

         
            setStart(true)
            await  agregarCurso(curso);
          
            if(!error){
                registroExitoso()
                resetForm({})
            }


        },
    });
    return (
        <HomeApp>
            <Spinner start={start} setStart={setStart} formik={formik}/>
            <div style={{
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
                        <Label for="Nombre">Nombre</Label>
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
                        <Label for="Descripcion">Descripcion</Label>
                        <Input invalid={formik.errors.Descripcion ? true : false} id="Descripcion"
                            name="Descripcion"
                            onChange={formik.handleChange}
                            value={formik.values.Descripcion} />
                        <FormFeedback invalid={"true"}>{formik.errors.Descripcion}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="Direccion">Direccion</Label>
                        <Input type="textarea" invalid={formik.errors.Direccion ? true : false} id="Direccion"
                            name="Direccion"
                            onChange={formik.handleChange}
                            value={formik.values.Direccion} />
                        <FormFeedback invalid={"true"}>{formik.errors.Direccion}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="Costo">Costo</Label>
                        <Input invalid={formik.errors.Costo ? true : false} id="Costo"
                            name="Costo"
                            onChange={formik.handleChange}
                            value={formik.values.Costo} />
                        <FormFeedback invalid={"true"}>{formik.errors.Costo}</FormFeedback>
                    </FormGroup>

                    <Button type="submit" >Confirmar</Button>
                </Form>
            </div>

        </HomeApp>
    )
}