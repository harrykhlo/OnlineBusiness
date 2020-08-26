import React from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function DeleteSaleModal(props) {
    const { SaleStage, sale } = props;

    const [open, setOpen] = React.useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`api/sales/${sale.id}`, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                SaleStage.updateAllFunction();
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
                    <hr />
                    <Form.Field>
                        <Button type='submit' floated="right" style={{ margin: '10px' }} color='red' content='delete' icon='remove' labelPosition='right' />

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

export default DeleteSaleModal
