import React from "react";

import { 
    Col,
    Accordion,
 } from "react-bootstrap";
import CollectibleList from "./CollectibleList";

function CollectibleCategoryList({ collectibleCategories, checkForCompletion, toggleCompletion }) {
    return (
        <Col xs={12}>
            <Accordion>
                { collectibleCategories.map(category => (
                    <Accordion.Item eventKey={category.id} key={category.id}>
                        <Accordion.Header>{category.title}</Accordion.Header>
                        <Accordion.Collapse eventKey={category.id}>
                            <CollectibleList 
                                collectibles={category.collectibles} 
                                checkForCompletion={checkForCompletion}
                                toggleCompletion={toggleCompletion}/>
                        </Accordion.Collapse>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Col>
    )
}

export default CollectibleCategoryList;
