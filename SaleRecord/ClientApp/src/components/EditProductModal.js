import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function EditProductModal(props) {
    const { updateProducts, product } = props;

    const [open, setOpen] = React.useState(false)
    const [name, setProductName] = React.useState(product.name)
    const [price, setPrice] = React.useState(product.price)

    const changeProductNameHandler = (e) => {
        setProductName(e.target.value)
    }
    const changePriceHandler = (e) => {
        setPrice(parseFloat(e.target.value))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const payload = { id: product.id, name, price }
        fetch(`api/products/${product.id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json', },
            body: JSON.stringify(payload)
        })
            .then(res => {
                console.log(res)
                updateProducts();
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
            <Header content='Edit product' />
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
                        <label>Address</label>
                        <input
                            type="text"
                            name="price"
                            value={price}
                            placeholder='Price'
                            onChange={changePriceHandler}
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

export default EditProductModal
