import React, { useState, useEffect } from "react";

import AuthApi from "./api/models/auth/index";

import { 
    Row, 
    Col, 
    Card,
    Form,
    Button
} from "react-bootstrap";

import { useCookies } from 'react-cookie';

import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [cookies, setCookie] = useCookies(['csrftoken', 'isAuthenticated']);

    useEffect(() => {
        if (cookies.isAuthenticated) {
            navigate("/")
        }
    }, [cookies, navigate])

    const onSubmit = (e) => {
        e.preventDefault();
        AuthApi.login({username: username, password: password})
            .then(response => {
                setCookie('isAuthenticated', "true")
                navigate("/")
            })
    }

    return (
        <Row>
            <Col xs="12" md={{span: 4, offset:4}}>
                <Card>
                    <Card.Body>
                        <Form onSubmit={(e) => onSubmit(e)}>
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder={"Username"} 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control 
                                    type="password" 
                                    placeholder={"Password"} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit">Login</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Login;