import React from "react";

import { 
    ListGroup, 
    ListGroupItem,
    FormCheck
} from "react-bootstrap";

function CollectibleList({ collectibles, checkForCompletion, toggleCompletion }) {
    return (
        <ListGroup>
            {collectibles.map(collectible => (
                <ListGroupItem key={collectible.id}>
                    <div className="d-flex justify-content-between">
                        {collectible.name}
                        <FormCheck checked={checkForCompletion(collectible.id)} onClick={(e) => toggleCompletion(collectible.id)}/>
                    </div>
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}

export default CollectibleList;
