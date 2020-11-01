import React from 'react'
import {Alert} from "@material-ui/lab"


function Results({error,success , results}) {





    return (
        <div>
          
          { error && <Alert severity="error">User not found or invalid entry</Alert>}
          
{success && results.map(result => {
               return <Alert key={result._id} severity="success">Customer: {result.name }   &nbsp;&nbsp; &nbsp;&nbsp;
               Description: {result.description} &nbsp;&nbsp; &nbsp;&nbsp; Account: {result.account}</Alert> 
           })

           
}





        

      </div>
    )
}

export default Results
