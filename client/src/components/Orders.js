import React, { useState }  from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from "@material-ui/core/Button"
import {deleteCustomer} from "../apiCalls/coreapicalls"
import {Link} from "react-router-dom"
import { isAuthenticated } from '../auth';




export default function Orders({products, error}) {

  const [reload, setReload] = useState(false)
  const { user , token} = isAuthenticated()


const removeCustomer = account => {
  deleteCustomer(account , user._id , token).then(data => {
    if(data.error){
      console.log(data.error)
    }else{
        setReload(!reload)
    }
  })
}









  return (
    <div>
    
    <React.Fragment>
      <Title>TNBX Database</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
        
            <TableCell>Name</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Description</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.account}</TableCell>
              <TableCell>{product.description}</TableCell>

              <Button variant="contained" color="primary" style ={{marginRight:"5px"} } size = "small" disableElevation >
              <Link to={`/update/${product.account}` }style={{textDecoration:"none" , color: "white"}}>Update</Link>
                </Button>

              <Button variant="contained" color="secondary" size = "small" disableElevation onClick = {() => {removeCustomer(product.account)}}>Delete</Button>

            </TableRow>
        
          )
        
          
          )
          
          }

        </TableBody>
        
      </Table>



    </React.Fragment>
    </div>
  );
}