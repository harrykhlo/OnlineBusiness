import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function NewCustomerModal(props) {
    const { updateCustomers } = props;

    const [open, setOpen] = React.useState(false)
    const [name, setFirstName] = React.useState('')
    const [address, setAddress] = React.useState('')

    const changeFirstNameHandler = (e) => {
        setFirstName(e.target.value)
    }
    const changeAddressHandler = (e) => {
        setAddress(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log({ name, address})
        fetch('api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ name, address })
        })
            .then(res => res.json())
            .then(data => {
                props.updateCustomers();
                setFirstName('');
                setAddress('');
                setOpen(false);
                return data;
            });
    }

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button primary >New Customer</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ width: '30%', height: 'auto', top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
            <Header content='Create customer' />
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
                        <p>{name}</p>
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
                        <p>{address}</p>
                    </Form.Field>    
                     <Button secondary onClick={() => setOpen(false)}>
                            cancel
                     </Button>
                    <Button type='submit' color='green'>
                            create   <Icon name='checkmark' />
                    </Button>
                    
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default NewCustomerModal
