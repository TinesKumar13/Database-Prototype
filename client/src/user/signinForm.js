import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Links from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated } from "../auth/index"
import Alert from "@material-ui/lab/Alert"
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Links color="inherit" href="https://www.tnbx.com.my/">
        TNBX
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


    export default function LogIn() {

        const [values, setValues] = useState({
          
          email : "",
          password: "",
          error: "",
          loading: false,
          didRedirect: false
        })
        
        const {email, password, error, loading, didRedirect} = values
        
        const {user} = isAuthenticated()
        
        const handleChange = name => event => {
        
          setValues({...values, error: false, [name] : event.target.value})
        
        }
        
        const onSubmit = event => {
          event.preventDefault();
          setValues({ ...values, error: false, loading: true });
          signin({ email, password })
            .then(data => {
              if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
              } else {
                authenticate(data, () => {
                  setValues({
                    ...values,
                    didRedirect: true
                  });
                });
              }
            })
            .catch(console.log("signin request failed"));
        };
        
        const performRedirect = () => {
          if(didRedirect){
            if(user && user.role === 1 ){
              return <Redirect to="/dashboard"/>
            }else{
              return <Redirect to="/dashboard"/>
            }
          }
        
          if(isAuthenticated()) {
            return <Redirect to ="/"/>
          }
        }
        
        
        
        
        
        const loadingMessage = () => {
        
          return (
            loading && (
              <CircularProgress/>
            )
          )
        
        }
        
        const errorMessage = () => {
        
        if(error){
          return <Alert severity="error">{error}</Alert>
        }
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
          const classes = useStyles();
        
          return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value = {email}
                    onChange= {handleChange("email")}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange= {handleChange("password")}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick= {onSubmit}
                  >
                    Sign In
                  </Button>

        
                 
                </form>
        
                      {loadingMessage()}
                      {errorMessage()}
                      {performRedirect()}
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
           
          );
        }