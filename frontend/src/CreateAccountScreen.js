import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';


export class CreateAccountScreen extends Component{
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
    alert('Data submitted ' + this.state.email);
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
    this.setState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }


  render(){
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Dialog 
            open="true"
            fullWidth="true"
            maxWidth='xs'

            >
              <div align="center">
                <AppBar>
                  <Typography variant="h6">
                    Fake News Tool Prototype
                  </Typography>
                </AppBar>
              </div>

              <div align = "center">
                  <Typography variant = "h6" color = "textSecondary">
                    Sign Up
                  </Typography>
              </div>  

              <TextField
                placeholder="Enter your Name"
                label="Name"
                margin="normal"
			         fullWidth="true"
               value = {this.state.name}
               onChange= {this.handleName}
              />

              <br />

              <TextField
                placeholder="Enter Email"
                label="Email"
                margin="normal"
			         fullWidth="true"
               validate = {this.validateEmail}
               value = {this.state.email}
               onChange= {this.handleEmail}
               errorMessage = "Email is invalid"
               emptyMessage = "Email can't be empty"
              />

              <br />

              <TextField
                placeholder="Enter Password"
                label="Password"
                type="password"
                margin="normal"
			         fullWidth="true"
               value = {this.state.password}
               onChange= {this.handlePassword}
              />

              <br />

              <TextField
                placeholder="Confirm your password"
                type = "password"
                label=" Confirm Password"
                margin="normal"
			         fullWidth="true"
               validate = {this.isConfirmedPassword}
               value = {this.state.confirmPassword}
               onChange= {this.handleConfirmPassword}
              />
            
              <br />
              <Button
                type = "submit"	
                color="primary"
                variant="contained"
                onClick = {this.handleSubmit}
              >Register</Button>

          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
	}
}

export default CreateAccountScreen;