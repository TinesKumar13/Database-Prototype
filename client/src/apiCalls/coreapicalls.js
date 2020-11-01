import {API} from "../backend"


export const getDatabase = (userId, token) => {
    return fetch(`${API}/database/${userId}` , {
      method: "GET",

      headers : {
          Accept : "application/json",
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
      
      return response.json()
       
    })
    .catch(error => console.log(error))
}


export const createCustomer = (data , userId , token) => {
  return fetch(`${API}/createdatabase/${userId}`, {
    method: "POST",

   
    
    headers : {
      Accept: "application/json",
      "Content-Type" : "application/json",
      Authorization: `Bearer ${token}`
  },

  body: JSON.stringify(data),

    
  }).then(response => {
    return response.json()
  })
  .catch(err => console.log(err))

}

export const deleteCustomer = (account , userId , token) => {
  return fetch(`${API}/deletedatabase/${userId}/${account}` , {
    method: "DELETE",

    headers : {
      Accept: "application/json",
      "Content-Type" : "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    return response.json()
  }).catch(err => console.log(err))
}

export const getCustomer = (account, userId , token) => {

  
  return fetch(`${API}/getdatabase/${userId}/${account}`, {
    method: "GET",

    headers : {
      Accept: "application/json",
      "Content-Type" : "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  
  .then(response => {
    
    
 return response.json()
  })
  .catch(err => console.log(err))
}

export const updateCustomer = (accountNo, data , userId , token) => {
  return fetch(`${API}/updatedatabase/${userId}/${accountNo}`, {
    method : "PATCH",

    headers : {
      Accept: "application/json",
      "Content-Type" : "application/json",
      Authorization: `Bearer ${token}`
  },

  body: JSON.stringify(data),
  

  }).then(response => {
    return response.json
  }).catch( err => console.log(err))
 
}
