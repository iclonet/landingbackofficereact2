import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import DashboardNav from "./components/navbar/Navbar";
import AppFooter from "../../components/app-footer/AppFooter";
import ContactDialog from "./components/contact-dialog/ContactDialog";
import Campaña from "../campaña/Campaña";
import Log from "../log/Log";
import FAQ from "../faq/Faq";
import Perfil from "../me/Perfil";

import UiUtils from "../../utils/UiUtils";
import ApiClient from "../../utils/ApiClient";
import Session from "../../utils/Session";
import smartleads from "../../images/smartleads.png";
import emptyLogo from "../../images/logo-empty.svg";
import lstrings from "../../utils/LStrings";
import CompleteUserData from "../home/components/complete-user-data/CompleteUserData";

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            showingContactDialog: false,
            logo: "",
            mostrarCompleteUserData: false,
            user: {},
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

    render() {
        let match = {
            path: "/dashboard",
            url: "/dashboard",
            isExact: false,
            params: {},
        };

        return (
            <div>
                <div className="wrapper">
                    <DashboardNav
                        onShowContactDialog={this.onShowContactDialog}
                        logo={this.state.logo}
                    />
                    <ContactDialog
                        show={this.state.showingContactDialog}
                        onClose={this.onCloseContactDialog}
                    />
                    <CompleteUserData
                        data={this.state.user}
                        mostrarCompleteUserData={
                            this.state.mostrarCompleteUserData
                        }
                        onCerrarCompleteUserData={this.cerrarCompleteUserData}
                        onCancelarCompleteUserData={
                            this.cancelarCompleteUserData
                        }
                    />
                    <div className="container-fluid">
                        <Route
                            path={`${match.url}/campaña`}
                            component={Campaña}
                        />
                        <Route path={`${match.url}/me`} component={Perfil} />
                        <Route path={`${match.url}/log`} component={Log} />
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
