import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react'
import NewCustomerModal from './NewCustomerModal';

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
                console.log(data);
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
                                    <Button primary>
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