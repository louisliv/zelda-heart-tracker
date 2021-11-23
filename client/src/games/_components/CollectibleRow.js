import React, { useState } from "react";

import { 
    Button, 
    ListGroupItem,
    FormCheck
} from "react-bootstrap";
import CollectibleModal from "./CollectibleModal";

function CollectibleRow({ collectible, toggleCompletion,checkForCompletion }) {
    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false);
    return (
        <>
            <ListGroupItem key={collectible.id}>
                <div className="d-flex justify-content-between">
                    <Button variant="link" onClick={(e) => setOpen(!open)}>
                        {collectible.name}
                    </Button>
                    <FormCheck checked={checkForCompletion(collectible.id)} onClick={(e) => toggleCompletion(collectible.id)}/>
                </div>
            </ListGroupItem>
            <CollectibleModal 
                collectible={collectible}
                isOpen={open}
                handleClose={handleClose}>
            </CollectibleModal>
        </>
    )
}

export default CollectibleRow;
