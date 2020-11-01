
import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';


import Container from '@material-ui/core/Container';

import {TextField, Button} from '@material-ui/core';
import {Alert} from "@material-ui/lab"
import {updateCustomer, getCustomer} from "../apiCalls/coreapicalls"
import { isAuthenticated } from '../auth';



const drawerWidth = 240;

//<---------------------------------This is styling section----------------------------------------------------->//
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
//<---------------------------------This is styling section----------------------------------------------------->//



const CustomerUpdate = ({match}) => {
  
  
  const classes = useStyles();



  //<---------- Real logic begins---------------->//





const [error, setError] = useState(false)
const [success, setSuccess] = useState(false)
const [customers, setCustomers] = useState([{
  name: "",
  account: "",
  description: ""
}])


const {name , account , description} = customers
const {user , token} = isAuthenticated()

const preload = accountNo => {
    getCustomer(accountNo , user._id , token).then(data => {
        if(data.error){
          setCustomers({...customers, error:data.error})
        }else {
          
          setCustomers({
            ...customers,
            name: data[0].name,
            account: data[0].account,
            description: data[0].description
          })

       

      


        }
    })
}




useEffect(() => {

  
    preload(match.params.accountNo)
   
},[error])



const handleChange = name => event => {

    setCustomers({...customers, error: false, [name] : event.target.value})

}

const handleSubmit = event => {

event.preventDefault()
setCustomers({...customers})

updateCustomer(match.params.accountNo, customers , user._id , token)
.then(data => {
  if(data.error){
    setCustomers({...customers})
  }else{
    setCustomers({
      ...customers,
      name: "",
      account: "",
      description: "",
    })
   setSuccess(true)
   setTimeout(function () {
    setSuccess(false)
  }, 3500)
  }
})

  

}

const successMessage = () => {
 if(success) return (<Alert  severity="success">User Succesfully Updated</Alert>)
}



  const myProductForm = () => (
    


      <form className={classes.root} style ={{display:"flex" , flexDirection:"column"} } onSubmit={handleSubmit} autoComplete="off" >
        
        <TextField InputLabelProps={{ shrink: true }}  id="outlined-basic" required label="Name" variant="outlined" style={{marginTop:"10px"}}  onChange={handleChange("name")} name="name" value={name}/>
        <TextField InputLabelProps={{ shrink: true }} type="number" id="outlined-basic" required label="Account" variant="outlined" style={{marginTop:"10px"}}  onChange={handleChange("account")} name="account" value={account}/>
        <TextField InputLabelProps={{ shrink: true }}  id="outlined-basic"  required label="Description" variant="outlined" style={{marginTop:"10px"}}  onChange={handleChange("description")} name="description" value={description}/>
        
 
        <Button variant="contained" size = "small" style={{marginTop:"10px", width: "10px"}} color="primary" disableElevation type="submit">
          Update
        </Button>
      </form>
  
  )
  
  //<---------- Real logic begins---------------->//

  return (
    <div>
 
        <Container maxWidth="lg" className={classes.container}>

            {/*addCategory stuff happens here*/}

              {myProductForm()}
              {successMessage()}

        </Container>
     
    </div>
  );
}

export default CustomerUpdate