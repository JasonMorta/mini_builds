import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function GetHTML() {

  function getData(){
    let table = document.querySelectorAll("td")
    for (const data of table) {
      console.log(data);
      //console.log(data.textContent === "Jacob");
    }
    //console.log(table);
   
  }

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    

      <Button 
        variant="warning"
        onClick={getData}
        >Get table data</Button>
    </>
  );
}

export default GetHTML;