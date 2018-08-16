import React from 'react';
import { Form, FormGroup, FormControl, Col, Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.googleSignIn = this.googleSignIn.bind( this );
  }

  googleSignIn () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider )
      .then((result) => {
        console.log( 'GOOGLE SIGN IN RESULT', result );
        this.props.handleLoggedIn();
      });
  }

  render () {
    return (
      <div style={{ margin: '40px' }}>
        <Button
          bsSize="large"
          onClick={this.googleSignIn}>
          Continue with Google
          <img
            src="https://www.bergeyselectric.com/content/wp-content/uploads/2011/11/google.jpg"
            style={{ width: '3%', height: '3%' }}
          />
        </Button>
      </div>
    );
  }
}


export default Login;