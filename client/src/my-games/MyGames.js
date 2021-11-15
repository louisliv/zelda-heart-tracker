import React from 'react';

import {
    Col,
    // Card,
    // CardImg,
    // CardBody,
    // CardTitle,
    // DropdownItem,
    Row
} from 'react-bootstrap'

function MyGames() {

    // loadGames() {
    //     let games = [];

    //     _.forEach(this.props.gameList, (game, key) => {
    //         games.push(
    //             <Col xs="12" md="3" key={key}>
    //                 <Card>
    //                     <CardImg top 
    //                         width="100%" 
    //                         src={Constants.mediaUrl.concat(game.display_image_url)}
    //                         alt={game.name}/>
    //                     <CardBody>
    //                         <CardTitle>{game.name}</CardTitle>
    //                     </CardBody>
    //                 </Card>
    //             </Col>
    //         )
    //     })

    //     return games;
    // }

    return (
        <Col xs='12'>
            <div>
                <h2>My Library</h2>
            </div>
            <hr />
            <Row>
                {/* {this.loadGames()} */}
            </Row>
        </Col>
    );
}

export default MyGames;