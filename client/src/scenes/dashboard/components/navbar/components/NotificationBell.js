import React from 'react';
import { countBy } from 'lodash';
import PropTypes from 'prop-types';
import lstrings from '../../../../../utils/LStrings';
import { Overlay, NavItem, Popover, Badge, ListGroup, ListGroupItem  } from 'react-bootstrap';

class NotificationBell extends React.Component {

    constructor() {
        super();

        this.state = {
            show: false
        };
    }

    generateBodyNotifications = () => {
        if (this.props.notifications.length === 0) {
            return <ListGroupItem>{lstrings.notificaciones_no_data}</ListGroupItem>;
        } else {
            return this.props.notifications.map((item, ix) => {
                let onItemClick = () => {
                    this.props.onNotificationClick(item);
                    this.setState({ show: false });
                }

                let className = "notification-item";

                if (!item.leida) {
                    className += " notification-unread";
                }
                if (!item.general) {
                    className += " notification-important";
                }

                return (<ListGroupItem key={ix} className={className.trim()} onClick={onItemClick}>{item.titulo}</ListGroupItem>);
            });
        }
    }


    onClick = () => {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        const title = <label onClick={this.onClick}>{lstrings.notificaciones}</label>; //eslint-disable-line

        const popoverNotifications =
            <Popover id="popover-notifications" title={title}>
                <ListGroup>
                    {this.generateBodyNotifications()}
                </ListGroup>
            </Popover>
            ;

        let count = countBy(this.props.notifications, 'leida').false;

        return (
            <span>
                <NavItem onClick={this.onClick} ref={(button) => { this.bell = button; }}>
                    <span>
                        <i className="fa fa-bell-o"></i>
                        {count && <Badge bsStyle="danger">{count}</Badge>}
                    </span>
                </NavItem>
                <Overlay show={this.state.show} placement="bottom" container={this} target={this.bell}>
                    {popoverNotifications}
                </Overlay>
            </span>

        );
    }
}

NotificationBell.propTypes = {
    notifications: PropTypes.array.isRequired,
    onNotificationClick: PropTypes.func.isRequired
};

export default NotificationBell;