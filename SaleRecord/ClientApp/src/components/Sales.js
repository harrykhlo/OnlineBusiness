import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react'
import NewCustomerModal from './NewCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import EditCustomerModal from './EditCustomerModal';

export class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = { customers: [], products: [], stores: [], sales: [], convertedSales: [], testDate: ''};
    }

    componentDidMount() {
        this.updateCustomers();
        this.updateProducts();
        this.updateStores();
        this.updateSales();
        // prepare the convertedSales ???????????????????????????????????????????????????????????????????
        //const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        //let current_datetime = new Date()
        //let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
        //console.log(formatted_date)

        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const d = new Date("2020-07-18T00:00:00");
        let formatted_date = d.getDate() + "-" + months[d.getMonth()] + "-" + d.getFullYear()
        console.log(formatted_date)

        
        //const dateString = d.toLocaleString();
        const dateString2 = formatted_date;
        this.setState({ ...this.state, testDate: dateString2 });
        console.log("testing");
        console.log(this.state.testDate);
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
                <p>Testing</p>
                <p>{this.state.testDate}</p>
                <Button secondary onClick={() => this.newSales()}>
                    Testing Add New Sale
                </Button>
                <Button secondary onClick={() => this.deleteSales()}>
                    Testing delete Sale
                </Button>
                <Button secondary onClick={() => this.editSales()}>
                    Testing edit Sale
                </Button>
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
