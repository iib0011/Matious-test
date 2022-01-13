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
    const headerSortingStyle = {backgroundColor: '#6cc3ef'};
    const sortCaret = (order, column) => {
        if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
        else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="white">Asc</font></span>);
        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="white">Desc</font>/Asc</span>);
        return null;
    }
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => {
                //give an index to each category found and replace their value in the products json
                const categorySet = json.reduce((previousValue, currentValue) => {
                    return previousValue.add(currentValue.category)
                }, new Set());
                // categories in format {0:"category0",1:"category1"}
                const categories = {...[...categorySet]};
                setCategoryOptions(categories);
                const categoryToIndex = swap(categories)
                json.map(product =>
                    product.category = categoryToIndex[product.category]
                )
                setProducts(json)
            })
    }, []);

    const columns = [
        {
            dataField: 'image',
            text: 'Image',
            formatter: imageFormatter
        },
        {
            dataField: 'title',
            text: 'Title'
        }, {
            dataField: 'price',
            text: 'Price',
            sort: true,
            headerSortingStyle,
            sortCaret

        }, {
            dataField: 'category',
            text: 'Category',
            formatter: cell => categoryOptions[cell],
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
            headerSortingStyle,
            formatter: ratingFormatter,
            sortCaret
        }];
    const options = {
        // pageStartIndex: 0,
        sizePerPage: 5,
        hideSizePerPage: true,
    };
    return (
        <div className="App">
            <div style={{margin:10}}>
            <h3 style={{
                borderRadius: '0.25em',
                textAlign: 'center',
                border: '1px solid',
                padding: '0.5em',
            }}>Products List</h3>
            <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory(options)}
                            filter={filterFactory()}
                            striped
                            hover
                            condensed
                            noDataIndication="Loading ..."
                            />
        </div>
        </div>
    );
}

export default App;
