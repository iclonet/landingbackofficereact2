import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import lstrings from '../../utils/LStrings';
//import './Faq.css';
import Session from '../../utils/Session';

const FAQ = () => {

  const titulo = <h4>Preguntas Frecuentes</h4>;
  let email = lstrings.contacto_mail;
  if(!Session.isMainSite()){
    email = Session.getAccount().email;
  }

  return (
    <div>
      <div className="faq">
        <Panel header={titulo}>
          <ListGroup fill>
            <ListGroupItem>
              <h4>Para soporte técnico <a href={`mailto:${email}`}>{email}</a></h4>
            </ListGroupItem>
          </ListGroup>
        </Panel>
      </div>
    </div>
  );
};


export default FAQ;
