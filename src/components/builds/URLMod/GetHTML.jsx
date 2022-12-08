
import Button from 'react-bootstrap/Button';
import Tables from './Tables'

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
   <Tables />
      <Button 
        variant="warning"
        onClick={getData}
        >Get table data</Button>
    </>
  );
}

export default GetHTML;