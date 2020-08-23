import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

function NewSaleModal(props) {

    const [open, setOpen] = React.useState(false);
    const todayJavaScript = new Date();
    const todaySQL = todayJavaScript.getFullYear() + "-" + (todayJavaScript.getMonth() + 1) + "-" + todayJavaScript.getDate() + "T00:00:00"
    //const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const todayDisplayString = (todayJavaScript.getMonth() + 1) + "/" + todayJavaScript.getDate() + "/" + todayJavaScript.getFullYear();
    console.log(todayDisplayString)
    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button primary >New Customer</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ width: '30%', height: 'auto', top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
            <Header content='Create sales' />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date sold</label>
                        {/*<input type="text" value={new Date()}/>*/}
                        <input type="text" defaultValue={todayDisplayString} />
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