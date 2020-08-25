import React from 'react'
import { Button, Header, Icon, Modal, Form, Dropdown } from 'semantic-ui-react'

function EditSaleModal(props) {

    const [open, setOpen] = React.useState(false);
    const [newSale, setNewSale] = React.useState({ productId: 0, customerId: 0, storeId: 0, dateSold: "" });
    //const todayJavaScript = new Date(); //for today
    const dateSoldJavaScript = new Date(props.sale.dateSold);
    //const todaySQL = todayJavaScript.getFullYear() + "-" + ("0" + (todayJavaScript.getMonth() + 1)).slice(-2) + "-" + todayJavaScript.getDate() + "T00:00:00"
    const dateSoldSQL = props.sale.dateSold;
    //const todayDisplayString = (dateSoldJavaScript.getMonth() + 1) + "/" + dateSoldJavaScript.getDate() + "/" + dateSoldJavaScript.getFullYear();
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
    //const tempNewSale = { productId: 0, customerId: 0, storeId: 0, dateSold: "2020-07-25T00:00:00" };
    const tempEditSale = { id: props.sale.id,  productId: props.sale.productId, customerId: props.sale.customerId, storeId: props.sale.storeId, dateSold: dateSoldSQL };

    const onChangeCustomerOptions = (event,  data ) => {
        console.log(data.value);
        tempEditSale.customerId = data.value;
        console.log("tempEditSale.customerId")
        console.log(tempEditSale.customerId);
        console.log(tempEditSale);
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, customerId: data.value })
    }

    const onChangeProductOptions = (event, data) => {
        console.log(data.value);
        tempEditSale.productId = data.value;
        console.log("tempEditSale.productId")
        console.log(tempEditSale.productId);
        console.log(tempEditSale);
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, productId: data.value })
    }

    const onChangeStoreOptions = (event, data) => {
        console.log(data.value);
        tempEditSale.storeId = data.value;
        console.log("tempEditSale.storeId")
        console.log(tempEditSale.storeId);
        console.log(tempEditSale);
        // problem: the setNewSale() (i.e. state hook) below cannot not be add, otherwise the selected value in the dropdown meun is disappeared
        //setNewSale({ ...newSale, storeId: data.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        //const payload = { productId: 1, customerId: 1, storeId: 1, dateSold: "2020-08-25T00:00:00" };
        //const payload = { id: 2, productId: 1, customerId: 2, storeId: 3, dateSold: "2020-07-18T00:00:00" }
        //{ id: 2, productId: 3, customerId: 1, storeId: 2, dateSold: "2020-07-18T00:00:00" } 
        //const tempEditSale = { productId: 0, customerId: 0, storeId: 0, dateSold: todaySQL };
        //console.log("tempEditSale is:");
        //console.log(tempEditSale);
        //    const payload = { id: 2, productId: 3, customerId: 1, storeId: 2, dateSold: "2020-07-18T00:00:00" }
        //console.log(payload)
        //console.log("tempEditSale is:");
        //console.log(tempEditSale);
        //console.log(tempEditSale.id === payload.id)
        //console.log(tempEditSale.productId === payload.productId)
        //console.log(tempEditSale.customerId === payload.customerId)
        //console.log(tempEditSale.storeId === payload.storeId)
        //console.log(tempEditSale.dateSold === payload.dateSold)
        fetch(`api/Sales/${tempEditSale.id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json', },
                //body: JSON.stringify(payload)
                body: JSON.stringify(tempEditSale)
            })
                .then(res => {
                    console.log(res)

                    props.SaleStage.updateAllFunction();
                    setOpen(false)

                    return res;
                });

        //const submitHandler = (e) => {
        //    e.preventDefault();
        //    const payload = { id: customer.id, name, address }
        //    //console.log(payload)
        //    fetch(`api/customers/${customer.id}`, {
        //        method: 'PUT',
        //        headers: { 'content-type': 'application/json', },
        //        body: JSON.stringify(payload)
        //    })
        //        .then(res => {
        //            console.log(res)
        //            updateCustomers();
        //            setOpen(false);
        //            return res;
        //        });

        //editSales = () => {
        //    const payload = { id: 2, productId: 3, customerId: 1, storeId: 2, dateSold: "2020-07-18T00:00:00" }
        //    //console.log(payload)
        //    fetch(`api/Sales/2`, {
        //        method: 'PUT',
        //        headers: { 'content-type': 'application/json', },
        //        body: JSON.stringify(payload)
        //    })
        //        .then(res => {
        //            console.log(res)
        //            return res;
        //        });


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