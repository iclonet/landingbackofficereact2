import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Col,
} from "react-bootstrap";
import Session from "../../../../utils/Session";
import PropTypes from "prop-types";
import WhatsappContact from "./components/WhatsappContact";

class DashboardNav extends Component {

    componentDidMount() {}

    onLogout = () => {
        Session.clear();
        location.reload();
    };

    render() {
        return (
            <div>
                <div
                    style={{
                        display: "inherit",
                        marginBottom: "30px",
                    }}
                >
                    <Navbar fluid>
                        <Navbar.Header style= {{marginLeft: '2%'}}>
                            <Navbar.Brand >
                                <LinkContainer to="/dashboard"style={{paddingTop: '15%'}} >
                                    <img
                                        
                                        className="img-responsive"
                                        src={this.props.logo}
                                        alt=""
                                    />
                                </LinkContainer>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav
                                pullLeft
                                style={{
                                    marginTop: "3px",
                                    minWidth: "76%",
                                    marginLeft: "32px",
                                    borderBottom: "1px solid rgb(69, 105, 134)",
                                }}
                            >
                                <NavDropdown
                                    title={<span>Administrar Campaña</span>}
                                    id="basic-nav-dropdown"
                                >
                                    <LinkContainer to="/dashboard/campaña">
                                        <MenuItem>Nueva</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/dashboard/">
                                        <MenuItem>Buscar</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/dashboard/">
                                        <MenuItem>Reportes</MenuItem>
                                    </LinkContainer>
                                </NavDropdown>

                                <NavDropdown
                                    title={<span>Administrar Parametros</span>}
                                    id="basic-nav-dropdown"
                                >
                                    <LinkContainer to="/dashboard/parameters">
                                        <MenuItem>Nuevo</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/dashboard/">
                                        <MenuItem>Buscar</MenuItem>
                                    </LinkContainer>
                                </NavDropdown>
                                <NavItem disabled>
                                    <Col
                                        style={{
                                            width: "90px",
                                        }}
                                        md={12}
                                    ></Col>
                                </NavItem>
                                <NavItem disabled>
                                    <Col
                                        style={{
                                            width: "90px",
                                        }}
                                        md={12}
                                    ></Col>
                                </NavItem>

                                <NavItem disabled>
                                    <Col
                                        style={{
                                            width: "90px",
                                        }}
                                        md={12}
                                    ></Col>
                                </NavItem>
                                <NavItem disabled>
                                    <Col
                                        style={{
                                            width: "90px",
                                        }}
                                        md={12}
                                    ></Col>
                                </NavItem>
                                <NavItem disabled>
                                    <Col
                                        style={{
                                            width: "90px",
                                        }}
                                        md={12}
                                    ></Col>
                                </NavItem>
                                <NavItem disabled>
                                    <Col
                                        style={{
                                            width: "90px",
                                        }}
                                        md={12}
                                    ></Col>
                                </NavItem>
                                <NavItem disabled>
                                    <Col
                                        style={{
                                            width: "90px",
                                        }}
                                        md={12}
                                    ></Col>
                                </NavItem>
                                <NavItem disabled>
                                    <Col
                                        style={{
                                            width: "90px",
                                        }}
                                        md={12}
                                    ></Col>
                                </NavItem>
                                <Nav
                                    pullRight
                                    style={{
                                        marginTop: "-10px",
                                        marginRight: "0px",
                                        marginBottom: "25px",
                                    }}
                                >
                                    <WhatsappContact />

                                    <NavDropdown
                                        style={{
                                            borderRight:
                                                "1px solid rgb(69, 105, 134)",
                                            borderLeft:
                                                "1px solid rgb(69, 105, 134)",
                                        }}
                                        title={
                                            <span>
                                                {" "}
                                                <i className="fa fa-user-circle-o"></i>
                                                {Session.getUser().userName}{" "}
                                            </span>
                                        }
                                        id="basic-nav-dropdown"
                                    >
                                        <LinkContainer to="/dashboard/me">
                                            <MenuItem>
                                                <i className="fa fa-user-circle-o" />
                                                Ver perfil
                                            </MenuItem>
                                        </LinkContainer>

                                        <MenuItem
                                            onSelect={
                                                this.props.onShowContactDialog
                                            }
                                        >
                                            <i className="fa fa-address-card-o" />
                                            Contacto
                                        </MenuItem>
                                        <MenuItem onSelect={this.onLogout}>
                                            <i className="fa fa-sign-out" />
                                            Cerrar sesión
                                        </MenuItem>
                                    </NavDropdown>
                                </Nav>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        );
    }
}

DashboardNav.propTypes = {
    onShowContactDialog: PropTypes.func.isRequired,
    logo: PropTypes.string.isRequired,
    match: PropTypes.object,
};

export default DashboardNav;
