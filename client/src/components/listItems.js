import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link , useHistory} from "react-router-dom"
import { isAuthenticated, signout } from '../auth';

const Menu = () =>  {

  const history = useHistory()

 return  (
  
    <div>
          <Link to="/dashboard" style={{textDecoration:"none"}}>
          <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText style={{color:"black"}} primary="View Database" />
                </ListItem>
          </Link>

          <Link to="/addcustomer" style={{textDecoration:"none"}}>
          <ListItem button>
        <ListItemIcon>
          <AddIcon/>
        </ListItemIcon>
        <ListItemText style={{color:"black"}} primary="Add Customer" />
      </ListItem>
          </Link>


          <Link to ="/searchcustomer" style={{textDecoration:"none"}}>
          <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary=" Search Customer" style={{color:"black"}}/>
      </ListItem>
          </Link>


{

  
  isAuthenticated() && (
    <Link style ={{textDecoration:"none"}} to ="/"  onClick = {() => {
      signout(() => {
    
          
        history.push("/")
      })
    }}>

<ListItem button>
      <ListItemIcon>
        <ArrowBackIcon />
      </ListItemIcon>
      <ListItemText style={{color:"black"}} primary="Sign Out" />
    </ListItem>

</Link>
  )
}


    </div>
    )
}

  export default Menu