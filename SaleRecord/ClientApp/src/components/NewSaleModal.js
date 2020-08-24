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


    const customerOptions = props.SaleStage.customers.map((customer) => ({
        key: customer.id,
        text: customer.name,
        value: customer.id
    }))

    const CustomerDropdownOption = () => (
        <Dropdown
            placeholder='Select Customer'
            fluid
            search
            selection
            options={customerOptions}
            onChange={onChangeCustomerOptions}
        />
    )

    const onChangeCustomerOptions = (event, data) => {
        console.log(data.value)
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

            }}
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
                    
                    <Form.Field>


                        <CustomerDropdownOption />

                    </Form.Field>
                    





                    <Button secondary onClick={() => setOpen(false)}> 
                        cancel
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
        )

}

export default NewSaleModal