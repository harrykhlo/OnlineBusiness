import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function EditCustomerModal(props) {
    const { updateCustomers, customer } = props;

    const [open, setOpen] = React.useState(false)
    const [name, setFirstName] = React.useState(customer.name)
    const [address, setAddress] = React.useState(customer.address)

    const changeFirstNameHandler = (e) => {
        setFirstName(e.target.value)
    }
    const changeAddressHandler = (e) => {
        setAddress(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const payload = { id: customer.id, name, address }
        fetch(`api/customers/${customer.id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json', },
            body: JSON.stringify(payload)
        })
            .then(res => {
                console.log(res)
                updateCustomers();
                setOpen(false);
                return res;
            });
    }

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button color='yellow'>
                <Icon name='edit outline' /> Edit
                     </Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ width: '30%', height: 'auto', top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
            <Header content='Edit customer' />
            <Modal.Content>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={name}
                            placeholder='First Name'
                            onChange={changeFirstNameHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"  
                            value={address}
                            placeholder='Address'
                            onChange={changeAddressHandler}
                        />
                    </Form.Field>    
                    <hr />
                    <Form.Field>
                        <Button type='submit' floated="right" style={{ margin: '10px' }} color='green' content='edit' icon='checkmark' labelPosition='right' />
                        <Button secondary floated="right" style={{ margin: '10px' }} onClick={() => setOpen(false)}>
                            cancel
                        </Button>
                    <br />
                    <br />
                    </Form.Field>
                    
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditCustomerModal
