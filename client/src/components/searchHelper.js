import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import "./buttons.css"
import { getCustomer } from '../apiCalls/coreapicalls';
import {TextField, Button} from '@material-ui/core';
import Results from "./Results"
import { isAuthenticated } from '../auth';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },

}));







const SearchHelper = () => {


    const [customer, setCustomer] = useState({
        account : "",
})
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [results, setResults] = useState([])
  
    const {account} = customer
   const{user, token} = isAuthenticated()

    
    
    const handleSubmit = event => {
    
       event.preventDefault()
        getCustomer(account , user._id , token)
        .then(data => {
            if(data.message){
              
               setError(true)
               setCustomer({...customer, account : ''})
           
            }else{
            
            setResults(data)
            setSuccess(true)
            setCustomer({...customer, account : ''})
        
            }
           
          })
          
 

            
    }

  



    const handleChange = name => event => {

        setCustomer({...customer, error: false, [name] : event.target.value})
    
    }


    const handleClear = event => {
      setError(false)
      setSuccess(false)
    }




  const classes = useStyles();

  return (
    
<div>
<form className={classes.root} style ={{display:"flex" , flexDirection:"column"} }  autoComplete="off" onSubmit= {handleSubmit} >
        
        <TextField required  InputLabelProps={{ shrink: true }}  id="outlined-basic"  label="Account Number" variant="outlined" style={{marginTop:"10px" , width:"900px" , marginRight:"500px"}}  onChange={handleChange("account")} name="account" value={account}/>
  
        
 <div className="buttons">
 <Button variant="contained" size = "small" style={{marginTop:"10px", width: "10px" }} color="primary" disableElevation type = "submit">
         Search
        </Button>
        <Button variant="contained" size = "small" style={{marginTop:"10px", width: "10px" }} color="primary" disableElevation onClick = {handleClear}>
         Clear
        </Button>
 </div>



      </form>

    <Results error = {error} success= {success} results = {results}/>
   
    
</div>






    
  );
  



}


export default SearchHelper