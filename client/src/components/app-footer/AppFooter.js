import React from 'react';
import Session from '../../utils/Session';
import moment from 'moment';
import lstrings from '../../utils/LStrings';
import {
    REPORTES_DOMAIN
}
from '../../config';

function AppFooter() {
  
  let year = moment().year()
  let companyName = null;

  if(Session.isMainSite()){
	  companyName = <a target="_blank" href={`http://${REPORTES_DOMAIN}`}>{lstrings.nombre_cia}</a>
  } else {
    companyName = Session.getCompanyName();
  }
  
  return (
    <footer>
      <p className="text-center" >Copyright © {year} {companyName}.Todos los derechos reservados</p>
    </footer>
  );
}

export default AppFooter;

