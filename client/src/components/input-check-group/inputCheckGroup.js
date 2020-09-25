import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Row, Col ,ControlLabel, HelpBlock, Button, FormControl, FormGroup } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import TableUtils from '../../utils/TableUtils';
import { Table } from 'react-bootstrap';
function FieldGroupCheck({ group, id, label, help, ...props }) {
    return (
        <Row>
        <Col md={2} className="margin-check">     
        <div className="flex">
          <div>
            <input {...props} className="check-input"/>
            </div>
            <div>
            <ControlLabel>{group.subbloque}</ControlLabel>
            {help && <HelpBlock>{help}</HelpBlock>}
            </div>
        </div>
        </Col>
        </Row>
    );
  }

class InputCheckGroup extends React.Component {
    
  

    constructor(props) {
        super(props);

        this.state = {
            dirty: false,
            valid: false
        };
    }

    onValueChange = (ev) => {
        this.props.onChange({ value: ev.target.value });
    }
    
    expandedRow = (row) => {
        return (
            <Table striped bordered condensed fill responsive>
                <thead>
                    <tr>
                        <td>Bloque</td>
                    </tr>
                </thead>
                <tbody>
                    {row.bloque.map((item, ix) => <tr key={ix}>
                    <td>{item.nombreBloque}</td>
                    {item.subbloque.map((item, ix) => <tr key={ix}>
                    <td>{item.nombreSubbloque}</td>
                    </tr>)}
                    </tr>)}
                </tbody>
            </Table>
        );
    }

     groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          var key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
      }

    generateGroup = (group) => {
        let categorias = group;
            if(categorias !== undefined ){
         
                return(   
                    <div> 
                    <BootstrapTable  striped={true} remote={true}  data={ categorias }
                           expandableRow={() => true}
                                expandComponent={this.expandedRow}
                                options={TableUtils.defaultConfig()}>
                        <TableHeaderColumn dataField='tipo' isKey >Tipo</TableHeaderColumn>
                      </BootstrapTable>
                      </div>
                        );
            }
    
     

         /*    bloques.map((bloque, ix) => 
            {
                console.log(bloque.tipo);
                elements.filter((element) => bloque.tipo.includes(element.tipo)).map((element) =>{
                    console.log(element.tipo + " ---- " + bloque.subbloque);
                  })
            }*/

           /* <div>
            {bloque.tipo === 'PERSONA' ?
            <div>
            <h4> PERSONA </h4>
            <FieldGroupCheck
                    id={bloque.subbloque}
                    type="checkbox"
                    group={bloque}
                    value={ix}
                    />
            </div>
            :   
            <div>
            <h4> EMPRESA </h4>
            <FieldGroupCheck
                    id={bloque.subbloque}
                    type="checkbox"
                    group={bloque}
                    value={ix}
                    />
             </div>
             }
         </div>*/
         
    }
    render() {
        return (
            <div>
            {this.generateGroup(this.props.group)}
            </div>
        );
    }

}

InputCheckGroup.propTypes = {
    group: PropTypes.array
}

export default InputCheckGroup;