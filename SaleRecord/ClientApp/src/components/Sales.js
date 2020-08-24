import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react'
import NewSaleModal from './NewSaleModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import EditCustomerModal from './EditCustomerModal';

export class Sales extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [{ id: 0, name: "", address: "" }],
            products: [{ id: 0, name: "", price: 0 }],
            stores: [{ id: 0, name: "", address: "" }],
            sales: [{ id: 0, productId: 0, customerId: 0, storeId: 0, dateSold: "" }],
            updateAllFunction: this.updateAll
        };
    }

    componentDidMount() {
        this.updateAll();
    }


    updateAll = () => {
        Promise.all([
            this.updateCustomers(),
            this.updateProducts(),
            this.updateStores(),
            this.updateSales()
        ]).then((promiseArray) => {
            this.setState({ ...this.state,
                customers: promiseArray[0],
                products: promiseArray[1],
                stores: promiseArray[2],
                sales: promiseArray[3]
            });
            console.log("here is the updateAll in Sales.js")
            return promiseArray;
        })
    }

    updateCustomers = () => {
        return fetch('api/customers', { method: 'GET' })
            .then(res => res.json());
    }

    getCustomerObjectById = (customerId) => this.state.customers.find(customer => customer.id === customerId)
    getCustomerNameById = (customerId) => this.getCustomerObjectById(customerId).name

    updateProducts = () => {
        return fetch('api/products', { method: 'GET' })
            .then(res => res.json());
    }

    getProductObjectById = (productId) => this.state.products.find(product => product.id === productId)
    getProductNameById = (productId) => this.getProductObjectById(productId).name

    updateStores = () => {
        return fetch('api/stores', { method: 'GET' })
            .then(res => res.json());
    }

    getStoreObjectById = (storeId) => this.state.stores.find(store => store.id === storeId)
    getStoreNameById = (storeId) => this.getStoreObjectById(storeId).name

    updateSales = () => {
        return fetch('api/sales', { method: 'GET' })
            .then(res => res.json());
    }

    convertSqlDateToDisplayString = (dateString) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const inputDate = new Date(dateString);
        let formattedDate = inputDate.getDate() + " " + months[inputDate.getMonth()] + " " + inputDate.getFullYear();
        return formattedDate;
    }

    render() {
        return (
            <div>
                <NewSaleModal SaleStage={this.state}/>
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
                                <Table.Cell>{this.getCustomerNameById(sale.customerId)}</Table.Cell>
                                <Table.Cell>{this.getProductNameById(sale.productId)}</Table.Cell>
                                <Table.Cell>{this.getStoreNameById(sale.storeId)}</Table.Cell>
                                <Table.Cell>{this.convertSqlDateToDisplayString(sale.dateSold)}</Table.Cell>
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
            </div>
            
            );

    }



}