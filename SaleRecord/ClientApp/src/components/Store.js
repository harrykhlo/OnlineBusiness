import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react'
import NewStoreModal from './NewStoreModal';
import DeleteStoreModal from './DeleteStoreModal';
import EditStoreModal from './EditStoreModal';

export class Store extends Component {

    constructor(props) {
        super(props);
        this.state = { stores: [] };
    }

    componentDidMount() {
        this.updateStores();
    }

    updateStores = () => {
        fetch('api/stores', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                this.setState({ stores: data });
                console.log(data);
                return data;
            });
    }

    render() {
        return (
            <div>
                <NewStoreModal updateStores={this.updateStores}/> 
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
                        {this.state.stores.map(store =>
                            <Table.Row key={store.id}>
                                <Table.Cell>{store.name}</Table.Cell>
                                <Table.Cell>{store.address}</Table.Cell>
                                <Table.Cell>
                                    <EditStoreModal updateStores={this.updateStores} store={store} />
                                </Table.Cell>
                                <Table.Cell>
                                    <DeleteStoreModal updateStores={this.updateStores} storeId={store.id}/>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}