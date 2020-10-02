import React ,{ useEffect, useState }  from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
//import DashboardNav from "./components/navbar/Navbar";
import AppFooter from "../../components/app-footer/AppFooter";
import ContactDialog from "./components/contact-dialog/ContactDialog";
import Log from "../log/Log";
import Perfil from "../me/Perfil";
import ApiClient from "../../utils/ApiClient";
import Session from "../../utils/Session";
import smartleads from "../../images/smartleads.png";
import AddParameters from "../Parametros/AddParameters";
import { LinkContainer } from "react-router-bootstrap";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Col,
} from "react-bootstrap";
import WhatsappContact from "./components/navbar/components/WhatsappContact";
import { Button } from "react-bootstrap";
import MainDash from './MainDash';
import { createCampaign, hashh } from "../api";


class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            showingContactDialog: false,
            logo: "",
            mostrarCompleteUserData: false,
            user: {},
            mainDash: false,
            showP : false
        };
    }

    componentDidMount() {
        this.loadLogo();
        this.loadCompleteUserForm();
    }

    loadCompleteUserForm = () => {
        ApiClient.getCurrentUser().then((resp) => {
            if (resp.data == null) {
                Session.clear();
                location.reload();
            } else if (resp.data.incompleto) {
                this.setState({
                    user: resp.data,
                });
                this.setState({
                    mostrarCompleteUserData: true,
                });
            }
        });
    };

    cancelarCompleteUserData = () => {
        this.setState({
            mostrarCompleteUserData: false,
        });
        Session.clear();
        location.reload();
    };
    cerrarCompleteUserData = () => {
        this.setState({
            mostrarCompleteUserData: false,
        });
    };

    loadLogo = () => {
        this.setState({
            logo: smartleads,
        });
    };

    onFinishGetLogo = (res) => {
        if (res) {
            const logo = Session.getLogo();
            this.setState({
                logo: logo,
            });
            return ApiClient.getClient(Session.getAccount().idCliente);
        }
    };

    onShowContactDialog = () => {
        this.setState({
            showingContactDialog: true,
        });
    };

    onCloseContactDialog = () => {
        this.setState({
            showingContactDialog: false,
        });
    };

    mainDashFunc = () => {
            this.setState({
                mainDash: true,
                //showP: false
            });
            

    }
    render() {
        let match = {
            path: "/dashboard",
            url: "/dashboard",
            isExact: false,
            params: {},
        };

        const DashboardNav = () => {
            const onLogout = () => {
                Session.clear();
                location.reload();
            };
            const onCloseContactDialog = () => {
                return false;
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
                            <Navbar.Header style={{ marginLeft: "2%" }}>
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
                                        borderBottom:
                                            "1px solid rgb(69, 105, 134)",
                                    }}
                                >
                                    <NavDropdown
                                        title={<span>Administrar Campaña</span>}
                                        id="basic-nav-dropdown"
                                    >

                                        <MenuItem onClick= {this.mainDashFunc}>
                                        Nueva
                                        </MenuItem>
                                        <LinkContainer to="/dashboard/">
                                            <MenuItem>Buscar</MenuItem>
                                        </LinkContainer>
                                        <LinkContainer to="/dashboard/">
                                            <MenuItem>Reportes</MenuItem>
                                        </LinkContainer>
                                    </NavDropdown>

                                    <NavDropdown
                                        title={
                                            <span>Administrar Parametros</span>
                                        }
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
                                                    this.onShowContactDialog
                                                }
                                            >
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
                </div>
            );
        };
        return (
            <div>
                <div className="wrapper">
                    <DashboardNav />

                    <ContactDialog
                        show={this.state.showingContactDialog}
                        onClose={this.onCloseContactDialog}
                    />
                    <div className="container-fluid">

                        {this.state.mainDash == true ? <MainDash hash={hashh} showParam ={this.state.showP}/> : null}
                        
                        <Route
                            path={`${match.url}/parameters`}
                            component={AddParameters}
                        />
                        <Route path={`${match.url}/me`} component={Perfil} />
                    </div>
                </div>
                <div className="clearfix" />
                <AppFooter />
            </div>
        );
    }
}

Dashboard.propTypes = {
    match: PropTypes.object,
};

export default Dashboard;
