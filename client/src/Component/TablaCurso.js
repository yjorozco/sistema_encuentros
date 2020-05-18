import React from 'react'
import TableComponent from './TableComponent';

export default function TablaCurso({data}) {

    const columns = React.useMemo(
        () => [
          {
            Header: 'Cursos Registrados',
            columns: [

              {
                Header: 'Nombre',
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
                Header: 'Dirección',
                accessor: 'direccion',
              },
              {
                Header: 'Descripción',
                accessor: 'descripcion',
              },
              {
                Header: 'Costo',
                accessor: 'costo',
              },
            ],
          },
         
        ],
        []
      )
    
      return (
    
          <TableComponent columns={columns} data={data} />
       
      )
    
}
