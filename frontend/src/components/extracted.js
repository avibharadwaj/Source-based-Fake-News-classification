import React from 'react';
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
import { useHistory } from 'react-router-dom';

export default class extracted extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props)
	}

	render() {
		return (
			<h1>Hello World</h1>
		)
	}
}