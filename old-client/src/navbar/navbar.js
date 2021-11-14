import React, { Component } from 'react';
// import AuthSelectors from 'store/selectors/auth';
// import AuthActions from 'store/action-creators/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHome,
    faGamepad,
    faDatabase
} from '@fortawesome/free-solid-svg-icons'
import { faPlaystation } from '@fortawesome/free-brands-svg-icons'

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

import { UISref } from '@uirouter/react'
import { router } from 'router';
import { connect } from 'react-redux';

class TopNavbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isOpen: false,
            value: ''
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        router.stateService.go('mediaitems.search', {
            searchTerm: this.state.value
        });
    }

    navigateToProfile = () => {
        router.stateService.go('auth.profile')
        this.toggle()
    }

    handleLogout = () => {
        // AuthActions.logout()
        //     .then(() => {
        //         this.toggle();
        //         if (router.stateService.current.requireAuth) {
        //             router.stateService.go('dashboard')
        //         }
        //     })
    }

    render() {
        return (
            <Navbar color="dark" dark className="main-navbar full-height">
                <Nav className="fixed" vertical>
                    <div className="sidebar-header">
                        { this.state.isOpen ?
                            <NavbarBrand>Zelda Heart Tracker</NavbarBrand>:
                            <NavbarBrand>ZHT</NavbarBrand>
                        }
                    </div>
                    <div>
                        <UISref to="home">
                            <NavItem><FontAwesomeIcon icon={faHome}/> Home</NavItem>
                        </UISref>
                    </div>
                    <div>
                        <UISref to="games.list">
                            <NavItem><FontAwesomeIcon icon={faGamepad}/> Games</NavItem>
                        </UISref>
                    </div>
                    <div>
                        <UISref to="systems.list">
                            <NavItem><FontAwesomeIcon icon={faPlaystation}/> Systems</NavItem>
                        </UISref>
                    </div>
                    <div>
                        <UISref to="myGames.list">
                            <NavItem><FontAwesomeIcon icon={faDatabase}/> My Library</NavItem>
                        </UISref>
                    </div>
                </Nav>
            </Navbar>
        )
    }
}

// TopNavbar.propTypes = {
//     currentUser: PropTypes.object.isRequired
// }

const mapStateToProps = state => {
    return {
        // currentUser: AuthSelectors.current(state.currentUser)
    }
}

const MainNavbar = connect(mapStateToProps)(TopNavbar)

export default MainNavbar;