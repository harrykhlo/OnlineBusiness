import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react'
import NewCustomerModal from './NewCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import EditCustomerModal from './EditCustomerModal';

export class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = { customers: [] };
    }

    componentDidMount() {
        this.updateCustomers();
    }

    updateCustomers = () => {
        fetch('api/customers', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                this.setState({ customers: data });
                return data;
            });
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}