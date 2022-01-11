import './App.css';
import {swap} from "./helpers"

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {selectFilter} from 'react-bootstrap-table2-filter';
import {useEffect, useState} from "react";
import {imageFormatter, ratingFormatter} from "./CellFormatters";


function App() {

    const [products, setProducts] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState({});

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => {
                //give an index to each category found and replace their value in the products json
                const categorySet = json.reduce((previousValue, currentValue) => {
                    return previousValue.add(currentValue.category)
                }, new Set());
                const categories={...[...categorySet]};
                setCategoryOptions(categories);
                const categoryToIndex = swap(categories)
                json.map(val=>{
                    val.category=categoryToIndex[val.category]
                })
                setProducts(json)
            })
    }, []);



    const columns = [
        {
            dataField: 'image',
            text:'Image',
            formatter: imageFormatter
        },
        {
            dataField: 'title',
            text: 'Title'
        }, {
            dataField: 'price',
            text: 'Price',
            sort: true,
        }, {
            dataField: 'category',
            text: 'Category',
            formatter:cell=>categoryOptions[cell],
            filter: selectFilter({
                options: categoryOptions
            })
        },
        {
            dataField: 'description',
            text: 'Description'
        },
        {
            dataField: 'rating.rate',
            text: 'Rating',
            sort: true,
            formatter: ratingFormatter
        }];
    const options = {
        // pageStartIndex: 0,
        sizePerPage: 5,
        hideSizePerPage: true,
    };
    return (
        <div className="App">
            <h1>Products list</h1>
            <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory(options)}
                            filter={filterFactory()}
                            striped
                            hover
                            condensed/>
        </div>
    );
}

export default App;
