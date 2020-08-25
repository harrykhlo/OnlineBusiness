import React from 'react'
import { Button, Header, Icon, Modal, Form, Dropdown } from 'semantic-ui-react'

function EditSaleModal(props) {

    const [open, setOpen] = React.useState(false);
    const [newSale, setNewSale] = React.useState({ productId: 0, customerId: 0, storeId: 0, dateSold: "" });
    const dateSoldJavaScript = new Date(props.sale.dateSold);
    const dateSoldSQL = props.sale.dateSold;
    const dateSoldDisplayString = (dateSoldJavaScript.getMonth() + 1) + "/" + dateSoldJavaScript.getDate() + "/" + dateSoldJavaScript.getFullYear();


    //given current date on the modal form and not allow to change
    const changeDateSoldHandler = (e) => {
        e.target.value = dateSoldDisplayString
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
                defaultValue={props.sale.customerId}
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
                defaultValue={props.sale.productId}
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
                defaultValue={props.sale.storeId}
                options={storeOptions}
                onChange={onChangeStoreOptions}
            />
        </div>
    )

    const tempEditSale = { id: props.sale.id, productId: props.sale.productId, customerId: props.sale.customerId, storeId: props.sale.storeId, dateSold: dateSoldSQL };

    const onChangeCustomerOptions = (event,  data ) => {
        tempEditSale.customerId = data.value;
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, customerId: data.value })
    }

    const onChangeProductOptions = (event, data) => {
        tempEditSale.productId = data.value;
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, productId: data.value })
    }

    const onChangeStoreOptions = (event, data) => {
        tempEditSale.storeId = data.value;
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, storeId: data.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`api/Sales/${tempEditSale.id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json', },
                body: JSON.stringify(tempEditSale)
            })
                .then(res => {
                    console.log(res)
                    props.SaleStage.updateAllFunction();
                    setOpen(false)
                    return res;
                });
    }

    return (

        <Modal
            closeIcon
            open={open}
            trigger={<Button color='yellow' > <Icon name='edit outline' /> Edit </Button>}
            onClose={() => setOpen(false)}
            onOpen={() => {
                setOpen(true);
                props.SaleStage.updateAllFunction();
                setNewSale({ ...newSale, dateSold: dateSoldSQL });

            }}
            style={{ width: '30%', height: 'auto', top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
            <Header content='Edit sales' />
            <Modal.Content>
                <p>{props.sale.dateSold}</p>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>Date sold</label>
                        {/*<input type="text" value={new Date()}/>*/}
                        <input type="text"
                            name="dateSold"
                            value={dateSoldDisplayString}
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

export default EditSaleModal