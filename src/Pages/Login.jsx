import React, { Component } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNameNadEmailAction } from '../redux/actions';
import ResponsiveAppBar from '../Components/Header2';

class Login extends Component {
  state = {
    isButtonInvalid: true,
    email: '',
    name: '',
  };

  startGame = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    const { token } = json;
    localStorage.setItem('token', token);
    dispatch(setNameNadEmailAction({ email, name }));
    history.push('/game');
  };

  validateButton = () => {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        isButtonInvalid: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateButton();
  };

  redirect = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isButtonInvalid } = this.state;
    return (
      <div>
        <Paper elevation={ 3 }>
          <TextField
            sx={ { margin: 2 } }
            label="Email"
            variant="outlined"
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <TextField
            sx={ { margin: 2 } }
            label="Nome"
            variant="outlined"
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <Button
            sx={ { margin: 3 } }
            variant="contained"
            color="success"
            type="button"
            data-testid="btn-play"
            disabled={ isButtonInvalid }
            onClick={ this.startGame }
          >
            Play
          </Button>
          <Button
            sx={ { margin: 2 } }
            variant="contained"
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirect }
          >
            Settings
          </Button>

        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Login);
