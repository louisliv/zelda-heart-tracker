import React from "react";

import { 
    ListGroup
} from "react-bootstrap";
import CollectibleRow from "./CollectibleRow";

function CollectibleList({ collectibles, checkForCompletion, toggleCompletion }) {
    return (
        <ListGroup>
            {collectibles.map(collectible => (
                <CollectibleRow
                    collectible={collectible}
                    checkForCompletion={checkForCompletion}
                    toggleCompletion={toggleCompletion}>
                </CollectibleRow>
            ))}
        </ListGroup>
    )
}

export default CollectibleList;
