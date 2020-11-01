
import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';


import Container from '@material-ui/core/Container';


import {TextField, Button} from '@material-ui/core';

import {createCustomer} from "../apiCalls/coreapicalls"
import Message from './Message';
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



export default function CustomerAdder() {
  
  
  const classes = useStyles();



  //<---------- Real logic begins---------------->//

const [values, setValues] = useState({
   
    name: "",
    account:"",
    description: "",
})




const [success, setSuccess] = useState(false)

const [error, setError] = useState(false)

const {name, account, description} = values

const [load, setLoad] = useState(false)

const { user , token } = isAuthenticated()


const handleChange = name => event => {

    setValues({...values,[name] : event.target.value})

}

const handleSubmit = event => {
  event.preventDefault()
  setValues({...values})

  setSuccess(true)
  createCustomer({name, account, description}, user._id, token)
  .then(data => {
      if(data[0].message){


        setValues({...values})
        setSuccess(false)
        setError(true)
        setTimeout(function () {
          setError(false)
        }, 3500)




      }else{

        
        setSuccess(true)

    }
  }).catch(err => setLoad(!load))

  setValues({
    ...values,
    name: "",
    account: "",
    description: "",
  })
  setTimeout(function () {
    setSuccess(false)
  }, 3500)

}




  const myProductForm = () => (
    


      <form className={classes.root} style ={{display:"flex" , flexDirection:"column"} } autoComplete="off" onSubmit={handleSubmit}>
        <TextField id="outlined-basic" required label="Customer Name" variant="outlined" style={{marginTop:"10px"}} onChange={handleChange("name")} name="customer" value={name}/>
        <TextField id="outlined-basic" required label="Customer Account" variant="outlined" style={{marginTop:"10px"}}  onChange={handleChange("account")} name="account" value={account}/>
        <TextField id="outlined-basic" required label="Description" variant="outlined" style={{marginTop:"10px"}}  onChange={handleChange("description")} name="description" value={description}/>
        
 
        <Button variant="contained" size = "small" style={{marginTop:"10px", width: "10px"}} color="primary" disableElevation type="submit" >
          Create 
        </Button>
      </form>
  
  )
  
  //<---------- Real logic begins---------------->//

  return (
    <div>
 
        <Container maxWidth="lg" className={classes.container}>

            {/*addCategory stuff happens here*/}

              {myProductForm()}
            <Message success = {success} error={error}/>
        </Container>
      
    </div>
  );
}