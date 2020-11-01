import React from 'react'
import {Alert} from "@material-ui/lab"


function Message({error,success}) {





    return (
        <div>
          
          { error && <Alert severity="error">Please provide number format for Customer Account ex: 943291XXX</Alert>}
         
          
{success &&    (<Alert  severity="success">User Succesfully Added</Alert>)
        
}
               

           






        

      </div>
    )
}

export default Message
