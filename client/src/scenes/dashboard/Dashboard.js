import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppFooter from "../../components/app-footer/AppFooter";
import UiUtils from '../../utils/UiUtils';
import ApiClient from '../../utils/ApiClient';
import DashboardNav from "./components/navbar/Navbar";

const Dashboard = () => {
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
                <div className="wrapper">
                    <DashboardNav />

                    <div className="container-fluid">
                        <h1 style={{marginLeft: '10%'}}> ¡Hola {user.nombre}!</h1>
                    </div>
                </div>
                <div className="clearfix" />
                <AppFooter />
            </div>
        );
    }

Dashboard.propTypes = {
    match: PropTypes.object,
};

export default Dashboard;
