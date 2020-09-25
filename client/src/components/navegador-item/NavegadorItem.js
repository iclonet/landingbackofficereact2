import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, OverlayTrigger } from 'react-bootstrap';

class NavegadorItem extends Component {
  render() {

    const pop = (
      <Popover id={`pop-${this.props.iditem}`}>
        {this.props.titulo}
      </Popover>
    )

    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement='left' overlay={pop}>
        <div className="item" id={`${this.props.iditem}-item`}>
          <a href={`#panel-${this.props.iditem}`}>
            <i className={`fa ${this.props.icon}`} />
          </a>
        </div>
      </OverlayTrigger>
    );
  }
}

NavegadorItem.propTypes = {
  titulo: PropTypes.string,
  iditem: PropTypes.string,
  icon: PropTypes.string,
};  

export default NavegadorItem;
