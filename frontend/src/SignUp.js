import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from 'react-router-dom';
import SignIn from './SignIn';

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
//auth.signInWithEmailAndPassword
//auth.createUserWithEmailAndPassword(email,pass)
//auth.onAuthStateChanged(firebaseUser => {})
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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

export class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event){
    this.setState({name: event.target.value});
  }

  handleEmail(event){
    this.setState({email: event.target.value});
  }

  handlePassword(event){
    this.setState({password: event.target.value});
  }

  handleConfirmPassword(event){
    this.setState({confirmPassword: event.target.value});
  }

  isConfirmedPassword(event) {
    return (event === this.state.password)
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
    var checkPassword = this.isConfirmedPassword(this.state.confirmPassword)
    if(canProceed) {
      var data = {
        email: this.state.email,
      }
    } else {
      alert('Email not valid.');
    }

    if(checkPassword){
      var data = {
        confirmPassword: this.state.confirmPassword,
      }
    }else{
      alert('passwords do not match.');
    }

    if(canProceed && checkPassword){
    	//SignUp
      auth.createUserWithEmailAndPassword(this.state.email, this.state.confirmPassword).then(()=>{
        this.props.history.push('/Main');
      }).catch(function(error){
            var errorCode = error.message;
            console.log(errorCode);
            alert(errorCode);
      })
  
    }
    this.setState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

  }

  

  
  render(){
  	const { classes } = this.props;
  return (

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
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value = {this.state.name}
                onChange= {this.handleName}
              />
            </Grid>
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
              <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
                validate = {this.isConfirmedPassword}
                value = {this.state.confirmPassword}
                onChange= {this.handleConfirmPassword}
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
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
                <Link to="/SignIn" variant="body2">
                Already have an account? Sign in
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignUp);

