import React, { Component } from 'react';
import Constants from 'utils/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import { MyGameActions } from 'store/my-games';

import { UISref } from '@uirouter/react'

import {
    Card,
    CardBody,
    CardTitle,
    CardImg,
    DropdownItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap'

class Game extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.addToLibrary = this.addToLibrary.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle(e) {
        e.preventDefault();
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    addToLibrary() {
        MyGameActions.addGame({id: this.props.game.id})
    }

    render() {
        return (
            <UISref to="games.details" params={{gameId:this.props.game.id}}>
                <Card>
                    <CardImg top 
                        width="100%" 
                        src={Constants.mediaUrl.concat(this.props.game.display_image_url)}
                        alt={this.props.game.name}/>
                    <CardBody>
                        <div className="flex-row justify-content-between">
                            <CardTitle>{this.props.game.name}</CardTitle>

                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle tag="div"
                                    data-toggle="dropdown"
                                    aria-expanded={this.state.dropdownOpen}>
                                    <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.addToLibrary}>Add Game to Library</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <div></div>
                        </div>
                    </CardBody>
                </Card>
            </UISref>
        )
    }
}

export default Game;