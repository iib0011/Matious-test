import './App.css';
import BootstrapTable from 'react-bootstrap-table-next';
function App() {
    const data=[{
        "id":1,
        "name":"jj",
        "price":4
    }]
    const columns = [{
        dataField: 'id',
        text: 'Product ID'
    }, {
        dataField: 'name',
        text: 'Product Name'
    }, {
        dataField: 'price',
        text: 'Product Price'
    }];
  return (
    <div className="App">
      <h1>Products list</h1>
        <BootstrapTable keyField='id' data={data} columns={ columns } />
    </div>
  );
}

export default App;
