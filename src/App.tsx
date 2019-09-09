import * as React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import PageContent from './components/PageContent';
import { Route, Switch } from 'react-router-dom';



class App extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Navbar></Navbar>
        <Switch>
          <Route to="/" component={PageContent}></Route>
        </Switch>
      </div >
    );
  }
}
export default App;
