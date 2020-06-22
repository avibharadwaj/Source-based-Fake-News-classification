import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import PropTypes from 'prop-types';

import {
  Link
} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to='./' color="inherit" href="https://material-ui.com/">
        FakeNewsTool
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});






export class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(event){
    this.setState({email: event.target.value});
  }

  handlePassword(event){
    this.setState({password: event.target.value});
  }


  validateEmail(event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  }

  handleSubmit(event){
    //alert('Data submitted ' + this.state.name);
    event.preventDefault();
    var canProceed = this.validateEmail(this.state.email)
    if(!canProceed) {
      alert('Email not valid.');
      return
    }

    if(canProceed){
        //SignUp
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            this.props.history.push('./Main');
        }).catch(function(error){
            var errorCode = error.message;
            console.log(errorCode);
            alert(errorCode);
      })
                    
    }
    this.setState({
      email: '',
      password: ''
    });
        
  }




	render(){
        const { classes } = this.props;
		return(

    <Container component="main" maxWidth="xs">
      <div align="center">
        <AppBar>
          <Typography variant="h6">
              Fake News Tool Prototype
          </Typography>
        </AppBar>
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                validate = {this.validateEmail}
                value = {this.state.email}
                onChange= {this.handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value = {this.state.password}
                onChange= {this.handlePassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

			);
	}
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignIn);