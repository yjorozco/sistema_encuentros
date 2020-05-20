import React from 'react'
import TableComponent from './TableComponent';

export default function TablaCurso({data}) {
 /* id:int,
    name:string,
    description:string,
    createdAt:int,
    updatedAt:int,
    author:address,
    file_hash:string}*/
    const columns = React.useMemo(
        () => [
          {
            Header: 'Certificados Registrados',
            columns: [

              {
                Header: 'id',
                accessor: 'id',
              },
              {
                Header: 'Nombre',
                accessor: 'name',
              },
              {
                Header: 'Descripcion',
                accessor: 'description',
              },
              {
                Header: 'Alumno',
                accessor: 'author',
              },
              {
                Header: 'Certificado',
                accessor: 'file_hash',
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
