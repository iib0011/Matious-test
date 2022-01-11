import './App.css';

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {useEffect, useState} from "react";
function App() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => setProducts(json));
    }, []);

    const imageFormatter = (cell, row) =>{
                return (
        <img src={cell}
             title={row.title}
        width={100}></img>
                );
            }
    const ratingFormatter = (cell, row) =>{
        let color='green';
        if (cell>=3 && cell<4){
            color='orange'
        }else if (cell<3){
            color ='red'
        }
        return (  <span><strong style={ { color: color } }> { cell }</strong></span>

        );
    }
    const columns = [
        {
            dataField: 'image',
            formatter: imageFormatter
        },
        {
        dataField: 'title',
        text: 'Title'
    }, {
        dataField: 'price',
        text: 'Price',
            sort:true,
    }, {
        dataField: 'category',
        text: 'Category'
    },
        {
            dataField: 'description',
            text: 'Description'
        },
        {
            dataField: 'rating.rate',
            text: 'Rating',
            formatter: ratingFormatter
        }];
  return (
    <div className="App">
      <h1>Products list</h1>
        <BootstrapTable bootstrap4 keyField='id' data={products} columns={ columns }  pagination={paginationFactory()}
                        striped
                        hover
                        condensed/>
    </div>
  );
}

export default App;
