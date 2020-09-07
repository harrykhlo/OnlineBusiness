import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react'
import NewProductModal from './NewProductModal';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    componentDidMount() {
        this.updateProducts();
    }

    updateProducts = () => {
        fetch('api/Products', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                this.setState({ products: data });
                //console.log(data);
                return data;
            });
    }

    render() {
        return (
            <div>
                
                <NewProductModal updateProducts={this.updateProducts}/>
                
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.products.map(product =>
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>
                                    
                                    <EditProductModal updateProducts={this.updateProducts} product={product} />
                                    
                                </Table.Cell>
                                <Table.Cell>
                                    
                                    <DeleteProductModal updateProducts={this.updateProducts} productId={product.id}/>
                                    
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}