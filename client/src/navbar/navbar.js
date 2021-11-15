import React, { useState, useEffect } from 'react';

import AuthApi from "../api/models/auth/index";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faGamepad,
  faDatabase,
  faArrowLeft,
  faArrowRight,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons'
import { faPlaystation } from '@fortawesome/free-brands-svg-icons'

import {
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'react-bootstrap';

import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { useNavigate } from "react-router-dom";

function MainNavbar() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cookies, setCookie] = useCookies(['csrftoken', "isAuthenticated"]);

  useEffect(() => {
    setIsLoggedIn(cookies.isAuthenticated);
  }, [cookies])

  // handleSubmit(e) {
  //     e.preventDefault();
  //     router.stateService.go('mediaitems.search', {
  //         searchTerm: this.state.value
  //     });
  // }

  // navigateToProfile = () => {
  //     router.stateService.go('auth.profile')
  //     this.toggle()
  // }

  const logout = () => {
    AuthApi.logout()
      .then(() => {
        setCookie("csrftoken", "")
        setCookie("isAuthenticated", "")
        navigate('/login')
      })
  }

  return (
    <div className="d-flex flex-column main-navbar sticky">
      <Nav className={{"flex-column": true, "flex-fill": true, "align-items-center": true}}>
        <div className="sidebar-header">
          {isOpen ?
            <NavbarBrand>Zelda Heart Tracker</NavbarBrand> :
            <NavbarBrand>ZHT</NavbarBrand>
          }
        </div>
        <div>
          <NavItem>
            <FontAwesomeIcon icon={faHome} />
            { isOpen ? 
              " Home":
              <></>
            }
          </NavItem>
        </div>
        <div>
          <Link to="games" color="white">
            <NavItem style={{color: "white"}}>
              <FontAwesomeIcon icon={faGamepad} />
              { isOpen ? 
                " Games":
                <></>
              }
            </NavItem>
          </Link>
        </div>
        <div>
          <Link to="systems" color="white">
            <NavItem style={{color: "white"}}>
              <FontAwesomeIcon icon={faPlaystation} /> 
              { isOpen ? 
                " Systems":
                <></>
              }
            </NavItem>
          </Link>
        </div>
        <div>
          <NavItem>
            <FontAwesomeIcon icon={faDatabase} /> 
            { isOpen ? 
              " My Library":
              <></>
            }
          </NavItem>
        </div>
      </Nav>
      { isLoggedIn ?
        <Button onClick={() => logout()}>
          Logout
        </Button>:
        <Link to="login">
          <Button className="dark-green-btn" onClick={() => {}}>
            <FontAwesomeIcon icon={faSignInAlt} />
            { isOpen ?
              " Login": ""
            }
          </Button>
        </Link>
      }
      <Button className="dark-green-btn" onClick={() => setIsOpen(!isOpen)}>
        { isOpen ?
          <FontAwesomeIcon icon={faArrowLeft} />:
          <FontAwesomeIcon icon={faArrowRight} />
        }
      </Button>
    </div>
  )
}

export default MainNavbar;