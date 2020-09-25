import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import FormCampaña from './FormCambaña';

class Campaña extends React.Component {
    render() {
    return (
        <div>
           <FormCampaña />
        </div>
    );
    };
}

Campaña.propTypes = {
    match: PropTypes.object,
};

export default Campaña;
