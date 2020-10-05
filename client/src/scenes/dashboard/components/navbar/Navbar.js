import React, { useEffect, useState } from "react";
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
import WhatsappContact from "./components/WhatsappContact";
import smartleads from "../../../../images/smartleads.png";
import ContactDialog from "../contact-dialog/ContactDialog";

const DashboardNav = () => {

    const onLogout = () => {
        Session.clear();
        location.reload();
    };

    const [showingContactDialog, setShowingContactDialog] = React.useState(
        false
    );

    const onShowContactDialog = () => {
        setShowingContactDialog(true);
    };

    const onCloseContactDialog = () => {
        setShowingContactDialog(false);
    };
    return (
        <div>
            <div
                style={{
                    display: "inherit",
                    marginBottom: "30px",
                }}
            >
                <Navbar fluid>
                    <Navbar.Header style={{ marginLeft: "4%" }}>
                        <Navbar.Brand>
                            <LinkContainer
                                to="/dashboard"
                                style={{ paddingTop: "15%" }}
                            >
                                <img
                                    className="img-responsive"
                                    src={smartleads}
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
                                <MenuItem
                                    onClick={() =>
                                        window.location.replace("/campaña")
                                    }
                                >
                                    Nueva
                                </MenuItem>
                                <LinkContainer to="/buscarCampaña">
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
                                <MenuItem
                                    onClick={() =>
                                        window.location.replace("/parameters")
                                    }
                                >
                                    Nuevo
                                </MenuItem>

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
                                    <LinkContainer to="/me">
                                        <MenuItem>
                                            <i className="fa fa-user-circle-o" />
                                            Ver perfil
                                        </MenuItem>
                                    </LinkContainer>

                                    <MenuItem onSelect={onShowContactDialog}>
                                        <i className="fa fa-address-card-o" />
                                        Contacto
                                    </MenuItem>
                                    <MenuItem onSelect={onLogout}>
                                        <i className="fa fa-sign-out" />
                                        Cerrar sesión
                                    </MenuItem>
                                </NavDropdown>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <ContactDialog
                show={showingContactDialog}
                onClose={onCloseContactDialog}
            />

        </div>
    );
};



export default DashboardNav;
