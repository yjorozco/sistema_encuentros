import React, { useContext, useEffect, useState } from 'react';
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
    //  Nombre: Yup.string()
    //      .required("nombre requerido"),
    Descripcion: Yup.string()
        .required("Fecha requerido"),
    FileData: Yup.mixed().required('A file is required')
        .test('fileFormat', 'PDF only', (value) => {
            console.log(value); return value && ['application/pdf'].includes(value.type);
        }),
});


export default function Apostillar() {
    const { success, agregarCertificado, error, is_logged, registroExitoso } = useContext(store);
    const [start, setStart] = useState(false)

    const history = useHistory();


    useEffect(() => {
        if (localStorage.getItem('is_logged') !== "on") {
            history.push("/");
        }
    }, [localStorage.getItem('is_logged')])


    const formik = useFormik({
        initialValues: {
            Descripcion: '',
            FileData: {},
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {

            let certificado = new FormData();
            certificado.append('fileData', values.FileData)
            certificado.append('descripcion', values.Descripcion)
            certificado.append('address', localStorage.getItem('address'))
            certificado.append('privateKey', localStorage.getItem('password'))
            setStart(true)

            await agregarCertificado(certificado);

            if (!error) {
                registroExitoso()
                formik.setFieldValue("FileData", {});
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

                <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <AlertSuccess success={success} />
                    <AlertError error={error} />
                    <FormGroup>
                        <Label for="Descripcion">Descripción</Label>
                        <Input type="text" invalid={formik.errors.Descripcion ? true : false} id="Descripcion"
                            name="Descripcion"
                            onChange={formik.handleChange}
                            value={formik.values.Descripcion} />
                        <FormFeedback invalid={"true"}>{formik.errors.Descripcion}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="FileData">Certificado</Label>
                        <Input type="file" invalid={formik.errors.FileData ? true : false} id="FileData"
                            name="FileData"
                            onChange={(event) => {
                                formik.setFieldValue("FileData", event.currentTarget.files[0]);
                                /*setFile(JSON.stringify(event.currentTarget.files[0]));*/
                                //formik.handleChange(event);
                            }}
                        />
                        <FormFeedback invalid={"true"}>{formik.errors.FileData}</FormFeedback>
                    </FormGroup>
                    <Button type="submit">Confirmar</Button>
                </Form>
            </div>

        </HomeApp>
    )
}