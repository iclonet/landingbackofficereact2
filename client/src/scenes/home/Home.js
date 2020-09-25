import React, {
    Component
} from 'react';

import AppFooter from '../../components/app-footer/AppFooter';
import FormLogin from './components/form-login/FormLogin';
import RecuperarClave from './components/recuperarclave/RecuperarClave';
import ApiClient from '../../utils/ApiClient';
import UiUtils from '../../utils/UiUtils';
import UserDemo from './components/user-demo/UserDemo';
import lstrings from '../../utils/LStrings';

class Home extends Component {

    constructor() {
        super();

        this.state = {
            mostrarRecuperarClave: false,
            mostrarUserDemo: false,
        };
    }

    onLogin = (userName, password) => {
        UiUtils.showProgress(true);
        ApiClient.authenticate(userName, password)
			.then(function (res) {
				console.log("errorrr", res)
                UiUtils.showProgress(false);
                if (res.success === true) {
                    UiUtils.navigateTo('/dashboard');
                } else {
                    throw new Error(res.reason);
                }
            }).catch(function (error) {
                UiUtils.showProgress(false);

                var msg = '';
				if (error !== undefined && error.status !== undefined) {
					switch (error.status) {
						case 401:
							switch (error.message) {
								case "AccountExpiredException":
									msg = lstrings.loginAccountExpiredException;
									break;

								case "LockedException":
									msg = lstrings.loginLockedException;
									break;

								case "CredentialsExpiredException":
									msg = lstrings.loginCredentialsExpiredException;

									ApiClient.createSecurePassword(userName)
										.then(function (res) {
											UiUtils.showProgress(false);
											UiUtils.showAlert(
												"Aviso",
												"Revise su casilla de correo electrónico, habrá recibido un nuevo mensaje con las instrucciones para cambiar su clave"
											);
										}).catch(function (error) {
											UiUtils.showProgress(false);
											UiUtils.showAlert(
												"Aviso",
												"La cuenta tiene una solicitud de restablecimiento de contraseña. Compruebe su casilla de correo electrónico."
											);
										});
									break;

								case "DisabledException":
									msg = lstrings.loginDisabledException;
									break;

								case "BadCredentialsException":
									msg = lstrings.loginBadCredentialsException;
									break;

								case "AccessDeniedByIpException":
									msg = lstrings.loginAccessDeniedByIpException;
									break;

								default:
									msg = lstrings.loginFailed;
							}
							break;
						
						case 412:
							msg = lstrings.serverResponsePreconditionFailed;
							break;
						
						case 500:
						case 502:
							msg = lstrings.serverResponse500;
							break;

						default:
							msg = lstrings.loginFailed;
					}
                } else {
                    msg = lstrings.loginFailed;
                }

                UiUtils.showAlert("Error", msg);
            });
    }

    mostrarRecuperarClave = () => {
        this.setState({
            mostrarRecuperarClave: true
        });
    }

    cerrarRecuperarClave = () => {
        this.setState({
            mostrarRecuperarClave: false
        });
    }
    mostrarUserDemo = () => {
        this.setState({
            mostrarUserDemo: true
        });
    }

    cerrarUserDemo = () => {
        this.setState({
            mostrarUserDemo: false
        });
    }

    render() {
        return (
            <div>
                <div className="wrapper-home">
                    <RecuperarClave
                        mostrarRecuperarClave={this.state.mostrarRecuperarClave}
                        onCerrarRecuperarClave={this.cerrarRecuperarClave}/>
                    <UserDemo
                        mostrarUserDemo={this.state.mostrarUserDemo}
                        onCerrarUserDemo={this.cerrarUserDemo}/>
                    <FormLogin
                        onMostrarRecuperarClave={this.mostrarRecuperarClave}
                        onLogin={this.onLogin}
                        onMostrarUserDemo={this.mostrarUserDemo}/>
                </div>
                <div className="clearfix"/>
                <AppFooter/>
            </div>
        );
    }
}

export default Home;
