import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react'
import NewSaleModal from './NewSaleModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import EditCustomerModal from './EditCustomerModal';

export class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [{ id: 0, name: "", address: "" }],
            products: [{ id: 0, name: "", price: 0 }],
            stores: [{ id: 0, name: "", address: "" }],
            sales: [{ id: 0, productId: 0, customerId: 0, storeId: 0, dateSold: "" }]
        };
    }

    componentDidMount() {
        this.updateCustomers();
        this.updateProducts();
        this.updateStores();
        this.updateSales();
    }

    convertDateFormat = (dateString) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const inputDate = new Date(dateString);
        let formattedDate = inputDate.getDate() + " " + months[inputDate.getMonth()] + " " + inputDate.getFullYear();
        return formattedDate;
    }

    newSales = () => {
        console.log(this.state.customers[0])
        //const payload = { productId: 3, customerId: 1, storeId: 2, dateSold: "2020-07-18T00:00:00", customer: this.state.customers[0], product: this.state.product[0], store: this.state.stores[0]};
        const payload = { productId: 3, customerId: 1, storeId: 2, dateSold: "2020-07-18T00:00:00"};
        console.log(payload);
        fetch('api/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                return data;
            });
    }

    deleteSales = () => {
        fetch(`api/Sales/1`, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            });
    }

    editSales = () => {
        const payload = { id: 2, productId: 3, customerId: 1, storeId: 2, dateSold: "2020-07-18T00:00:00" } 
        //console.log(payload)
        fetch(`api/Sales/2`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json', },
            body: JSON.stringify(payload)
        })
            .then(res => {
                console.log(res)
                return res;
            });
    }

    getCustomerById = (customerId) => this.state.customers.find(customer => customer.id === customerId)

    getProductById = (productId) => this.state.products.find(product => product.id === productId)

    getStoreById = (storeId) => this.state.stores.find(store => store.id === storeId)


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
                <p>Testing</p>
                
                <Button secondary onClick={() => this.newSales()}>
                    Testing Add New Sale
                </Button>
                <Button secondary onClick={() => this.deleteSales()}>
                    Testing delete Sale
                </Button>
                <Button secondary onClick={() => this.editSales()}>
                    Testing edit Sale
                </Button>

                <NewSaleModal />

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Date Sold</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.sales.map(sale =>
                            <Table.Row key={sale.id}>
                                <Table.Cell>{this.getCustomerById(sale.customerId).name}</Table.Cell>
                                <Table.Cell>{this.getProductById(sale.productId).name}</Table.Cell>
                                <Table.Cell>{this.getStoreById(sale.storeId).name}</Table.Cell>
                                <Table.Cell>{this.convertDateFormat(sale.dateSold)}</Table.Cell>
                                <Table.Cell>
                                    <Button color='yellow'>
                                        <Icon name='edit outline' /> Edit
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red'>
                                        <Icon name='trash' /> Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
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
