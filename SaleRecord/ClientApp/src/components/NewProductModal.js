import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function NewProductModal(props) {
    const { updateProducts } = props;

    const [open, setOpen] = React.useState(false)
    const [name, setProductName] = React.useState('')
    const [price, setPrice] = React.useState('')

    const changeProductNameHandler = (e) => {
        setProductName(e.target.value)
    }
    const changePriceHandler = (e) => {
        setPrice(parseFloat(e.target.value))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log({ name, price})
        fetch('api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ name, price })
        })
            .then(res => res.json())
            .then(data => {
                updateProducts();
                setProductName('');
                setPrice('');
                setOpen(false);
                return data;
            });
    }

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button primary >New Product</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ width: '30%', height: 'auto', top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
            <Header content='Create product' />
            <Modal.Content>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={name}
                            placeholder='Product Name'
                            onChange={changeProductNameHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input
                            type="text"
                            name="price"  
                            value={price}
                            placeholder='Price'
                            onChange={changePriceHandler}
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

export default NewProductModal
