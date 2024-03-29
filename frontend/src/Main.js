import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import PropTypes from 'prop-types';

import services from './services/integration';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

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
    width: '90%',
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
  },

  buttonSources:{
    alignItems: 'right',
    marginTop: theme.spacing(2,100,2),
  },

  dialogAppBar:{
    position:'relative',
  },

  dialogTitle:{
    marginLeft: theme.spacing(2),
    flex:1,
  }

});

export class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visibility: false,
			extraction: {},
      results: {},
      open: false,
      setOpen: false
		}
		this.handleLogOut = this.handleLogOut.bind(this);
    this.renderLabel = this.renderLabel.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
   handleClickOpen = () => {
    this.setState({setOpen:true});
    this.setState({open:true});
  };

   handleClose = () => {
    this.setState({setOpen:false});
    this.setState({open:false})
  };

	extractBtn = async (event) => {
		event.preventDefault()
		const url = event.target.url.value
    let response = await services.postUrl(url) 
		this.setState({ extraction: response })

		// services get Model values
    const allResults = await services.getAll(url)
		this.setState({results: allResults})
		// console.log(this.state.extraction)
    this.setState({ visibility: true })
	}

  renderText = () => {
    // Object.keys(this.state.extraction).forEach(function(e){
    //   console.log(e);
    // })
    return(
      <div>
        <div>Article Text:</div>
        <div>{this.state.extraction.text}</div>
      </div>)
  }

  renderKeywords = () => {
    return(
      <div>
        <div>Keywords:</div>
        <div>{this.state.extraction.keywords.join(' ')}</div>
      </div>
    )
  }

  renderLabel = () => {
    console.log(this.state.results)
    const mlValues = this.state.results
    const arr = []
    for(let key in mlValues) {
      const b = []
      b.push(key)
      b.push(mlValues[key])
      arr.push(b)
    }

    console.log(arr)
    return(
      <table>
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {arr.map(a => {
            return (
              <tr>
                <td>{a[0]}</td><td>{a[1]}</td>
              </tr>
              )
          })}
        </tbody>
      </table>
      )
  }

  // openLink = (link) => {
  //   window.open=link;
  // }
  
  Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

  handleCitiations = () => {
    const arr = []
    for(let article of this.state.extraction.citiations) {
      arr.push(<ListItem button>
        <ListItemText  primary={article.title} secondary={article.link} />
      </ListItem>)
    }
    return arr
  }

  handleNoCitiations = () => {
    return (
      <ListItem button>
        <ListItemText  primary={'Sorry no matching articles found'} secondary={'Try again later'} />
      </ListItem>
    )
  }

  renderButtonSource = () => {
    const { classes } = this.props;
    return(
      <div>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          align="right"
          onClick={this.handleClickOpen}
          >
          View Sources
        </Button>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={this.state.Transition}>
        <AppBar className={classes.dialogAppBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.dialogTitle}>
              Other Sources
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {this.state.extraction.citiations.length === 0 ? this.handleNoCitiations() : this.handleCitiations()}
        </List>
      </Dialog>     
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
              <div className = {classes.buttonSources}>
                {this.state.visibility === true ? this.renderButtonSource() : <div></div>}
              </div>
      			</div>
              <div className={classes.article}>
                {this.state.visibility === true ? this.renderText() : <div></div>}
              </div>

              <div className = {classes.text}>
                {this.state.visibility === true ? this.renderLabel() : <div></div>}
              </div>

              <div className = {classes.text}>
                {this.state.visibility === true? this.renderKeywords() : <div></div>}
              </div>

    		</Container>


		);
	}
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Main)