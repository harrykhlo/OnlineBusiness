import React from 'react'
import { Button, Header, Icon, Modal, Form, Dropdown } from 'semantic-ui-react'

function NewSaleModal(props) {

    const [open, setOpen] = React.useState(false);
    const [customers, setCustomers] = React.useState([{ id: 0, name: " ", address: " "}]);
    const todayJavaScript = new Date();
    const todaySQL = todayJavaScript.getFullYear() + "-" + (todayJavaScript.getMonth() + 1) + "-" + todayJavaScript.getDate() + "T00:00:00"
    //const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const todayDisplayString = (todayJavaScript.getMonth() + 1) + "/" + todayJavaScript.getDate() + "/" + todayJavaScript.getFullYear();
    console.log(todayDisplayString)

    const changeDateSoldHandler = (e) => {
        e.target.value = todayDisplayString
    }

    const updateCustomers = () => {
        fetch('api/customers', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setCustomers(data);
                console.log(data);
                return data;
            })
            .then(data => {
                console.log("check customers");
                console.log(customers);
                return data;
            });
    }


    //updateProducts = () => {
    //    fetch('api/products', { method: 'GET' })
    //        .then(res => res.json())
    //        .then(data => {
    //            this.setState({ ...this.state, products: data });
    //            //console.log(data);
    //            return data;
    //        }).then(data => {
    //            console.log(this.state.customers);
    //            console.log(this.state.products);
    //            console.log(this.state.stores);
    //            console.log(this.state.sales);
    //            return data;
    //        });
    //}


    //updateStores = () => {
    //    fetch('api/stores', { method: 'GET' })
    //        .then(res => res.json())
    //        .then(data => {
    //            this.setState({ ...this.state, stores: data });
    //            //console.log(data);
    //            return data;
    //        }).then(data => {
    //            console.log(this.state.customers);
    //            console.log(this.state.products);
    //            console.log(this.state.stores);
    //            console.log(this.state.sales);
    //            return data;
    //        });
    //}

    const customerOptions = () => customers.map((customer) => ({
        key: customer.id,
        text: customer.name,
        value: customer.id
    }))


    return (

        <Modal
            closeIcon
            open={open}
            trigger={<Button primary >New Customer</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => { setOpen(true); updateCustomers()}}
            style={{ width: '30%', height: 'auto', top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
            <Header content='Create sales' />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date sold</label>
                        {/*<input type="text" value={new Date()}/>*/}
                        <input type="text"
                            name="dateSold"
                            value={todayDisplayString}
                            onChange={changeDateSoldHandler}
                        />
                        <p>{customers[0].name}</p>
                    </Form.Field>
                    {/*
                    <Form.Field>
                        <Dropdown
                            placeholder='Select Customer'
                            fluid
                            selection
                            option={customerOptions}
                            value = ()
                        / >
                    </Form.Field>
                    */}





                    <Button secondary onClick={() => setOpen(false)}> 
                        cancel
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
        )

}

export default NewSaleModal