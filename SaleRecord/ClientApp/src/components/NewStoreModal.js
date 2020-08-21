import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function NewStoreModal(props) {
    const { updateStores } = props;

    const [open, setOpen] = React.useState(false)
    const [name, setStoreName] = React.useState('')
    const [address, setAddress] = React.useState('')

    const changeStoreNameHandler = (e) => {
        setStoreName(e.target.value)
    }
    const changeAddressHandler = (e) => {
        setAddress(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log({ name, address})
        fetch('api/stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ name, address })
        })
            .then(res => res.json())
            .then(data => {
                updateStores();
                setStoreName('');
                setAddress('');
                setOpen(false);
                return data;
            });
    }

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button primary >New Store</Button>}
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
                            name="storeName"
                            value={name}
                            placeholder='Store Name'
                            onChange={changeStoreNameHandler}
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
                     <Button secondary onClick={() => setOpen(false)}>
                            cancel
                     </Button>
                    <Button type='submit' color='green' content='create' icon='checkmark' labelPosition='right' />
                    
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default NewStoreModal
