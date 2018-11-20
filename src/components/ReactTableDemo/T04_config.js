import React from 'react';

let cols = [
      {
        Header: "First Name",
        accessor: "firstName",
        checked: true
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        checked: true
      },
      {
        Header: "Age",
        accessor: "age",
        checked: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        maxWidth: 80,
        Cell: row => (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: row.value === 'relationship' ? '#ff2e00'
              : row.value === 'complicated' ? '#ffbf00'
              : '#57d500',
            transition: 'all .3s ease'
          }} />
        ),
        checked: true
      }
    ];
export default cols;
