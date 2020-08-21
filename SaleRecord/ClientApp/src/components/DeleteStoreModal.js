import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function DeleteStoreModal(props) {
    const { updateStores, storeId } = props;

    const [open, setOpen] = React.useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
        console.log({ updateStores, storeId})
        fetch(`api/stores/${storeId}`, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                updateStores();
                setOpen(false);
                return data;
            });
    }

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button color='red'>
                        <Icon name='trash' /> Delete
                     </Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ width: '30%', height: 'auto', top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
            <Header content='Delete store' />
            <Modal.Content>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>Are you sure?</label>
                    </Form.Field>  
                     <Button secondary onClick={() => setOpen(false)}>
                            cancel
                     </Button>
                     <Button type='submit' color='red' content='delete' icon='remove' labelPosition='right' />
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default DeleteStoreModal
