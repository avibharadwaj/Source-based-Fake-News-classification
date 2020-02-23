import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';
import Main from './Main';

function App() {
  return (
    <div className = "App">
    	<BrowserRouter>
        <div>
        <Route path="/" exact component={SignUp} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/Main" exact component={Main} />
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;