import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { BrowserRouter,Switch,Route,Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useHistory } from 'react-router-dom';

import services from './services/integration';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // var displayName = user.displayName;
     var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // // ...
    alert("Signed in: " + email);
  } else {
    // User is signed out.
    // ...
    alert("User not signed in/logged out.");
  }
});

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 70, 2),

  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

export class Main extends React.Component{
	constructor(props){
		super(props);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	extractBtn = (event) => {
		event.preventDefault()
		// console.log(event.target.url.value)
		services.postUrl(event.target.url.value);
	}

	handleLogOut(event){
		event.preventDefault();
		firebase.auth().signOut().then(()=> {
  		// Sign-out successful.
  		this.props.history.push('./');
		}).catch(function(error) {
  		// An error happened.
            var errorCode = error.message;
            console.log(errorCode);
            alert(errorCode);
		});
	}

	render(){
		const { classes } = this.props;
		return(
    		<Container component="main" maxWidth="lg">
      			<div align="center">
        		<AppBar>
       			<Toolbar>
          			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            			<MenuIcon />
          			</IconButton>
          			<Typography variant="h6" className={classes.title}>
            			Fake News Tool Prototype
          			</Typography>
          			<Button 
          			color="inherit"
          			onClick={this.handleLogOut}
          			>Logout</Button>
        		</Toolbar>
        		</AppBar>
      			</div>
      			<div className={classes.paper}>
      			  <form className={classes.form} noValidate onSubmit={this.extractBtn}>
      			    <Grid container spacing={2}>
      			      <Grid item xs={12}>
      			        <TextField
      			          variant="outlined"
      			          fullWidth
      			          id="url"
      			          label="Enter URL"
      			          name="url"
      			        />
      			      </Grid>
      			      <Button
						type="submit"
						variant="contained"
						color="primary"
						align="center"
						className = {classes.submit}>
      			      Submit
      			    </Button>
      			    </Grid>
      			  </form>
      			</div>
    		</Container>


		);
	}
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Main)