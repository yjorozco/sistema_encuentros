import React from 'react'
import TableComponent from './TableComponent';

export default function TablaAlumno({data}) {

    const columns = React.useMemo(
        () => [
          {
            Header: 'Alumnos Registrados',
            columns: [

              {
                Header: 'Curso',
                accessor: 'nombre',
              },
              {
                Header: 'Fecha',
                accessor: 'fecha',
              },
              {
                Header: 'Hora',
                accessor: 'hora',
              },
              {
                Header: 'Alumno',
                accessor: 'identificador',
              },
              {
                Header: 'Costo',
                accessor: 'costo',
              }
            ],
          },
         
        ],
        []
      )
    
      return (
    
          <TableComponent columns={columns} data={data} />
       
      )
    
}
