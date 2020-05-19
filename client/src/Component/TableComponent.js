import React, { useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
import { Table } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 2px solid #ccc;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-top: 1px solid #ccc;
      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination.page-item a:hover {
    order:0
  }
  .pagination {
    padding: 0.5rem;
    background-color: '#fff';
  }`

export default function TableComponent({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  useEffect(() => {
    setPageSize(5)
  }, [])


  // Render the UI for your table
  return (
    <>
      <div style={{
        display: "flex",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",


      }}>
      <Styles>
        <div >
          <Table  {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        <div >
          <Pagination  style={{ backgroundColor: "#fff", order:0 }}>
            <PaginationItem>
              <PaginationLink first onClick={() => gotoPage(0)} disabled={!canPreviousPage} href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={() => previousPage()} disabled={!canPreviousPage} href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next onClick={() => nextPage()} disabled={!canNextPage} href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} href="#" />
            </PaginationItem>
          </Pagination>
        </div>
        </Styles>
      </div>      
    </>
  )
}

