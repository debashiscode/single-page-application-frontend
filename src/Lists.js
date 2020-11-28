import React from 'react'

function Lists(props) {
    var rows = [];
    props.alldata.forEach(element => {
        rows.push(
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.userId}</td>
            <td>{element.title}</td>
            <td>{element.body}</td>
            </tr>
        )
    });
    return(
      <table className="table">
          <thead>
              <tr>
                  <th>No</th>
                  <th>User Id</th>
                  <th>Title</th>
                  <th>Description</th>
              </tr>
          </thead>
        <tbody>{rows}</tbody>
      </table>
    )
}

export default Lists;
