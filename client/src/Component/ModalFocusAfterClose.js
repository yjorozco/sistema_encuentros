import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ListGroupItem, ListGroup, Col } from 'reactstrap';

const ModalFocusAfterClose = ({toggle, setToggle, data}) => {

    return (
        <div>
            <Modal isOpen={toggle}>
                <ModalBody>
                <ListGroup>
                    <ListGroupItem>Address</ListGroupItem>
                    <ListGroupItem><Col xs={12} className="overflow-auto">{data[0]}</Col></ListGroupItem>
                    <ListGroupItem >Private Key</ListGroupItem>
                    <ListGroupItem ><Col xs={12} className="overflow-auto">{data[1]}</Col></ListGroupItem>
                </ListGroup>
                </ModalBody>
                <ModalFooter>
                   <Button color="primary" onClick={() => {setToggle(!toggle)}}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalFocusAfterClose;