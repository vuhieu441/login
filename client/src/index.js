import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';
import { Zoom } from '@material-ui/core';
const styles = {
  success: { backgroundColor: 'purple' },
  error: { backgroundColor: 'blue' },
  warning: { backgroundColor: 'green' },
  info: { backgroundColor: 'yellow' },
};
const classes = styles;
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}
         classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantWarning: classes.warning,
          variantInfo: classes.info,
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    TransitionComponent={Zoom}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>  
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
