import React, { useEffect, useState } from "react";
import UiUtils from '../../utils/UiUtils';
import ApiClient from '../../utils/ApiClient';
import FormCampaña from '../campaña/FormCambaña';
import DashboardNav from "../dashboard/components/navbar/Navbar";
import {hashh } from "../api";


const MainDash = (props) => {
  const [error, setError] = useState();
  const[user , setUser] = React.useState([]);
  useEffect(() => {
    try {
      getData();
    } catch (err) {
        setError(err);
    }
}, []);

    function  getData  ()  {
        UiUtils.showProgress(true);
        ApiClient.getAccount()
          .then(onFinishGetAccount)
          .then(() => {
            UiUtils.showProgress(true);
            return ApiClient.getListUsers();
          })
          .catch((error) => {
            UiUtils.showProgress(false);
            UiUtils.showError(error);
          });
      }
    
      function onFinishGetAccount (res)  {
        UiUtils.showProgress(false);
        if (res.result.code === 200) {
          setUser( res.data );
        } else {
          throw UiUtils.handledError(res.result.info);
        }
      }
    
        return (
          <div>
            <DashboardNav />
            <FormCampaña id= {user.idCliente} hash={hashh} />
          </div>
        );
      }

export default MainDash;