import React, { Component } from 'react';
import UiUtils from '../../utils/UiUtils';
import ApiClient from '../../utils/ApiClient';
import FormCampaña from '../campaña/FormCambaña';

class MainDash extends Component {

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

      render() {
    
        return (
          <div>
            <FormCampaña id= {this.state.user.idCliente} />
          </div>
        );
      }
    }
export default MainDash;