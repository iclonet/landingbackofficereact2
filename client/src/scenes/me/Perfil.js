import React, { Component } from 'react';
import { Panel, Button, Row, Col } from 'react-bootstrap';
import UiUtils from '../../utils/UiUtils';
import ApiClient from '../../utils/ApiClient';
import Session from '../../utils/Session';
import TablePlain from '../../components/table-plain/TablePlain';
import QuestionDialog from '../../components/question-dialog/QuestionDialog';
import UserDialog from './components/user-dialog/UserDialog';
import ChangePasswordDialog from './components/change-password-dialog/ChangePasswordDialog';
import TableUsers from './components/table-users/TableUsers';
import DashboardNav from "../dashboard/components/navbar/Navbar";


class Perfil extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userDialog: {
        showing: false,
        user: null
      },
      deleteDialog: {
        showing: false,
        message: '',
        user: {}
      },
      showingChangePasswordDialog: false,
      user: {
        idCliente: 0,
        cliente: "",
        nombre: "",
        apellido: "",
        email: "",
        cuil: 0
      },
      listUsers: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    UiUtils.showProgress(true);
    ApiClient.getAccount()
      .then(this.onFinishGetAccount)
      .then(() => {
        UiUtils.showProgress(true);
        return ApiClient.getListUsers();
      })
      .then(this.onFinishGetListUsers)
      .catch((error) => {
        UiUtils.showProgress(false);
        UiUtils.showError(error);
      });
  }

  onFinishGetAccount = (res) => {
    UiUtils.showProgress(false);
    if (res.result.code === 200) {
      this.setState({ user: res.data });
    } else {
      throw UiUtils.handledError(res.result.info);
    }
  }

  onFinishGetListUsers = (res) => {
    UiUtils.showProgress(false);
    if (res.result.code === 200) {
      this.setState({
        listUsers: res.data.users
      });
    } else {
      throw UiUtils.handledError(res.result.info);
    }
  }

  onCreateUserClick = () => {
    this.setState({ userDialog: { showing: true, user: null } });
  }

  onModifyUser = (user) => {
    this.setState({ userDialog: { showing: true, user: user } });
  }

  onCloseUserDialog = () => {
    this.setState({ userDialog: { showing: false, user: null } });
  }

  onCreateUser = (newUser) => {
    newUser.cliente = { id: this.state.user.idCliente };
    UiUtils.showProgress(true);
    ApiClient.createUser(newUser)
      .then(this.onFinishUpdateUser)
      .catch((error) => {
        error.response.then((e) => {
          UiUtils.showProgress(false);
        UiUtils.showAlert('Error', e.message ); 
         })
        
      });
  }

  onModifiedUser = (user) => {
    UiUtils.showProgress(true);
    ApiClient.modifyUser(user)
      .then(this.onFinishUpdateUser)
      .catch((error) => {
        UiUtils.showProgress(false);
        UiUtils.showError(error);
      });
  }

  onFinishUpdateUser = (res) => {
    UiUtils.showProgress(false);
    if (res.result.code === 200) {
      if (res.data) {
        this.onCloseUserDialog();
        this.getData();
      } else {
        throw UiUtils.handledError("Ocurrió un error al actualizar los datos del usuario");
      }
    } else {
      throw UiUtils.handledError(res.result.info);
    }
  }

  onDeleteUser = (user) => {
    this.setState({
      deleteDialog: {
        showing: true,
        message: `¿Desea eliminar al usuario ${user.usuario}?`,
        user: user
      }
    });
  }

  onAcceptDelete = () => {
    UiUtils.showProgress(true);
    ApiClient.deleteUser(this.state.deleteDialog.user)
      .then(this.onFinishDeleteUser)
      .catch((error) => {
        UiUtils.showProgress(false);
        UiUtils.showError(error);
      });

    this.onCloseDeleteDialog();
  }

  onFinishDeleteUser = (res) => {
    UiUtils.showProgress(false);
    if (res.result.code === 200) {  
      this.onCloseDeleteDialog();
      this.getData();
    } else {
      throw UiUtils.handledError("Ocurrió un error al elminar el usuario");
    }
  }

  onCloseDeleteDialog = () => {
    this.setState({
      deleteDialog: {
        showing: false,
        message: '',
        user: null
      }
    });
  }

  onChangePasswordClick = () => {
    this.setState({ showingChangePasswordDialog: true });
  }
  onCloseChangePasswordDialog = () => {
    this.setState({ showingChangePasswordDialog: false });
  }
  onChangePassword = (newPass) => {
    UiUtils.showProgress(true);
    ApiClient.changePassword(newPass)
      .then(this.onFinishChangePassword)
      .catch((error) => {
        UiUtils.showProgress(false);
        UiUtils.showError(error);
      });
  }

  onFinishChangePassword = (res) => {
    UiUtils.showProgress(false);
    if (res.result.code === 200) {
      if (res.data) {
        this.onCloseChangePasswordDialog();
        UiUtils.showAlert("Información", "Se ha cambiado su contraseña con éxito");
      } else {
        throw UiUtils.handledError("Ocurrió un error al cambiar la contraseña");
      }
    } else {
      throw UiUtils.handledError(res.result.info);
    }
  }

  render() {

    const titulo = <h4><i className="fa fa-user"></i>  Mi Cuenta</h4>;
    const tituloUsuarios = <h4><i className="fa fa-users"></i>  Usuarios</h4>;

    return (
      <div>
        <DashboardNav />
        <div>
        <UserDialog show={this.state.userDialog.showing} user={this.state.userDialog.user} onClose={this.onCloseUserDialog} onCreateUser={this.onCreateUser} onModifiedUser={this.onModifiedUser} />
        <ChangePasswordDialog show={this.state.showingChangePasswordDialog} onClose={this.onCloseChangePasswordDialog} onChangePassword={this.onChangePassword} />
        <QuestionDialog show={this.state.deleteDialog.showing} title="Atención" message={this.state.deleteDialog.message} onAccept={this.onAcceptDelete} onCancel={this.onCloseDeleteDialog} />
        <h1>Panel de control</h1>
        <Panel defaultExpanded header={titulo}>
          <TablePlain title=""
            columns={['ID Cliente', 'Cliente', 'Nombre', 'Apellido', 'Email', 'CUIL/CUIT']}
            rows={[<tr key={1}>
              <td>{this.state.user.idCliente}</td>
              <td>{this.state.user.cliente}</td>
              <td>{this.state.user.nombre}</td>
              <td>{this.state.user.apellido}</td>
              <td>{this.state.user.email}</td>
              <td>{this.state.user.cuil}</td>
            </tr>]} />
          <Row>
            <Col xs={2} xsOffset={10}>
              <Button bsStyle="primary" className="btn-block" onClick={this.onChangePasswordClick}>Cambiar contraseña</Button>
            </Col>
          </Row>
        </Panel>

        {Session.getUser().isAdmin && <Panel defaultExpanded header={tituloUsuarios}>
          <TableUsers data={this.state.listUsers} onDeleteUser={this.onDeleteUser} onModifyUser={this.onModifyUser} />
          <br />
          <Row>
            <Col xs={2} xsOffset={10}>
              <Button bsStyle="primary" className="btn-block" onClick={this.onCreateUserClick}>Crear Usuario</Button>
            </Col>
          </Row>
        </Panel>}
      </div>
      </div>
      
    );
  }
}

export default Perfil;