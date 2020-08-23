import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

function NewSaleModal(props) {

    const [open, setOpen] = React.useState(false)
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

        </Modal>
        )

}

export default NewSaleModal