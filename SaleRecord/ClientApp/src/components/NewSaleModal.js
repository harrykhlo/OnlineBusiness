import React from 'react'
import { Button, Header, Icon, Modal, Form, Dropdown } from 'semantic-ui-react'

function NewSaleModal(props) {

    const [open, setOpen] = React.useState(false);
    const [newSale, setNewSale] = React.useState({ productId: 0, customerId: 0, storeId: 0, dateSold: "" });
    const todayJavaScript = new Date();
    const todaySQL = todayJavaScript.getFullYear() + "-" + ("0" + (todayJavaScript.getMonth() + 1)).slice(-2) + "-" + todayJavaScript.getDate() + "T00:00:00"
    const todayDisplayString = (todayJavaScript.getMonth() + 1) + "/" + todayJavaScript.getDate() + "/" + todayJavaScript.getFullYear();
    

    //given current date on the modal form and not allow to change
    const changeDateSoldHandler = (e) => {
        e.target.value = todayDisplayString
    }

    const customerOptions = props.SaleStage.customers.map((customer) => ({
        key: customer.id,
        text: customer.name,
        value: customer.id
    }))

    const productOptions = props.SaleStage.products.map((product) => ({
        key: product.id,
        text: product.name,
        value: product.id
    }))

    const storeOptions = props.SaleStage.stores.map((store) => ({
        key: store.id,
        text: store.name,
        value: store.id
    }))

    const CustomerDropdownOption = () => (
        <div>
            <label>Customer</label>
            <Dropdown
                placeholder='Select Customer'
                fluid
                search
                selection
                options={customerOptions}
                onChange={onChangeCustomerOptions}
                />
        </div>
    )

    const ProductDropdownOption = () => (
        <div>
            <label>Product</label>
            <Dropdown
                placeholder='Select Product'
                fluid
                search
                selection
                options={productOptions}
                onChange={onChangeProductOptions}
            />
        </div>
    )

    const StoreDropdownOption = () => (
        <div>
            <label>Store</label>
            <Dropdown
                placeholder='Select Store'
                fluid
                search
                selection
                options={storeOptions}
                onChange={onChangeStoreOptions}
            />
        </div>
    )
 
    const tempNewSale = { productId: 0, customerId: 0, storeId: 0, dateSold: todaySQL };

    const onChangeCustomerOptions = (event,  data ) => {
        tempNewSale.customerId = data.value;
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, customerId: data.value })
    }

    const onChangeProductOptions = (event, data) => {
        tempNewSale.productId = data.value;
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, productId: data.value })
    }

    const onChangeStoreOptions = (event, data) => {
        tempNewSale.storeId = data.value;
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, storeId: data.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch('api/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(tempNewSale)
        })
            .then(res => res.json())
            .then(data => {
                props.SaleStage.updateAllFunction();
                setOpen(false)
                return data;
            });
    }

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button primary >New Sale</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => {
                setOpen(true);
                props.SaleStage.updateAllFunction();
                setNewSale({ ...newSale, dateSold: todaySQL });
            }}
            style={{ width: '30%', height: 'auto', top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
            <Header content='Create sales' />
            <Modal.Content>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>Date sold</label>
                        <input type="text"
                            name="dateSold"
                            value={todayDisplayString}
                            onChange={changeDateSoldHandler}
                        />
                    </Form.Field> 
                    <Form.Field>
                        <CustomerDropdownOption />
                    </Form.Field>
                    <Form.Field>
                        <ProductDropdownOption />
                    </Form.Field>
                    <Form.Field>
                        <StoreDropdownOption />
                    </Form.Field>
                    <hr />
                    <Form.Field>
                        <Button type='submit' floated="right" style={{ margin: '10px' }} color='green' content='create' icon='checkmark' labelPosition='right' />

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

export default NewSaleModal