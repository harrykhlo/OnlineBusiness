import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react'
import NewCustomerModal from './NewCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import EditCustomerModal from './EditCustomerModal';

export class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = { customers: [], products: [], stores: [], sales: [], convertedSales: []};
    }

    componentDidMount() {
        this.updateCustomers();
        this.updateProducts();
        this.updateStores();
        this.updateSales();
        // prepare the convertedSales ???????????????????????????????????????????????????????????????????
    }

    updateCustomers = () => {
        fetch('api/customers', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                this.setState({ ...this.state, customers: data });
                //console.log(data);
                return data;
            }).then(data => {
                console.log(this.state.customers);
                console.log(this.state.products);
                console.log(this.state.stores);
                console.log(this.state.sales);
                return data;
            });
    }

    updateStores = () => {
        fetch('api/stores', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                this.setState({ ...this.state, stores: data });
                //console.log(data);
                return data;
            }).then(data => {
                console.log(this.state.customers);
                console.log(this.state.products);
                console.log(this.state.stores);
                console.log(this.state.sales);
                return data;
            });
    }

    updateProducts = () => {
        fetch('api/products', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                this.setState({ ...this.state, products: data });
                //console.log(data);
                return data;
            }).then(data => {
                console.log(this.state.customers);
                console.log(this.state.products);
                console.log(this.state.stores);
                console.log(this.state.sales);
                return data;
            });
    }

    updateSales = () => {
        fetch('api/sales', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                this.setState({ ...this.state, sales: data });
                //console.log(data);
                return data;
            }).then(data => {
                console.log(this.state.customers);
                console.log(this.state.products);
                console.log(this.state.stores);
                console.log(this.state.sales);
                return data;
            });
    }

    render() {
        return (
            
            <div>
                {/*
                <NewCustomerModal updateCustomers={this.updateCustomers}/> 
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.customers.map(customer =>
                            <Table.Row key={customer.id}>
                                <Table.Cell>{customer.name}</Table.Cell>
                                <Table.Cell>{customer.address}</Table.Cell>
                                <Table.Cell>
                                    <EditCustomerModal updateCustomers={this.updateCustomers} customer={customer} />
                                </Table.Cell>
                                <Table.Cell>
                                    <DeleteCustomerModal updateCustomers={this.updateCustomers} customerId={customer.id}/>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                */}
            </div>
            
        );
    }
}
