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
import Extracted from './components/extracted';

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
  article:{
    alignItems: 'left',
    marginTop: theme.spacing(10),
    width: '50%',
    fontFamily: 'Arial',
    fontSize: 14
},
  text:{
    alignItems: 'left',
    marginTop: theme.spacing(5),
    width: '50%',
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 'bold'   
  }

});

export class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visibility: false,
			extraction: {},
      naive:'',
      svm:''
		}
		this.handleLogOut = this.handleLogOut.bind(this);
    this.renderObj = this.renderObj.bind(this);
	}

	extractBtn = async (event) => {
		event.preventDefault()
		const url = event.target.url.value
		let response = await services.postUrl(url)
		response.authors = response.authors.join(',')
		this.setState({ extraction: response })

		// services get Model values
		const svmResult = await services.getSVM(url)
		const naiveResult = await services.getNaive(url)
		this.setState({naive:naiveResult, svm:svmResult})
		console.log(this.state.extraction)
    console.log('Naive: ' + naiveResult);
    console.log('SVM: ' + svmResult);
	}

  renderObj = () => {
    // Object.keys(this.state.extraction).forEach(function(e){
    //   console.log(e);
    // })
    return(
      <div>
        {this.state.extraction.text}
      </div>)
  }

  renderText = () => {
    return(
      <div>
        Naive : {this.state.naive} || 
        SVM : {this.state.svm}
      </div>
      )
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
              <div className={classes.article}>
                Article Text:
                {this.renderObj()}
              </div>
              <div className={classes.text}> 
                {this.renderText()}
              </div>
    		</Container>


		);
	}
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Main)

{/* <Grid container spacing = {2}>
	<TextField 
		variant="onlined"
		fullWidth
		id={e[0]}
		label={e[0]}
		value={e[1]}
	/>
</Grid> */}