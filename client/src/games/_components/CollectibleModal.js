import React from "react";
import { 
    Modal,
    Table
} from "react-bootstrap";

function CollectibleModal({ collectible, isOpen, handleClose }) {
    return (
        <Modal 
            show={isOpen} 
            onHide={handleClose}
            size="lg"
            centered>
            <Modal.Body>
                <Table>
                    <tr>
                        <th>Location</th>
                        <td>{collectible.location}</td>
                    </tr>
                    <tr>
                        <th>How To Collect</th>
                        <td>{collectible.description}</td>
                    </tr>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default CollectibleModal;