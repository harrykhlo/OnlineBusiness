import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function NewCustomerModal() {
    const [open, setOpen] = React.useState(false)

    return (
       
        <Modal
            closeIcon
            open={open}
            trigger={<Button primary >New Customer</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header content='Create customer' />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input placeholder='Address' />
                    </Form.Field>    
                     
                     <Button secondary onClick={() => setOpen(false)}>
                            cancel
                     </Button>
                    <Button type='submit' color='green' onClick={() => setOpen(false)}>
                            create <Icon name='checkmark' />
                    </Button>
                    
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default NewCustomerModal
