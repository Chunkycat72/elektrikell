import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

//App - react component, written via function
//Component's name always starts with Capital letter
//Components same as functions variables, but they are called properties (props)
//Component returs React element (JSX)
function App() {


  const [radioValue, setRadioValue] = useState('low');
  const [hourValue, setHourValue] = useState(1);
  //useState - react hook, allows to work with components state
  //with useState takes initial state as default value. radioValue = 'low'
  //useState returns array with 2 elements
  //[1] = default or new value of state/variable
  //[2] = function that can change value of state/variable
  //when state changed re-render of component is launched
  //all names of react hooks start with 'use', all function of statechange, start with 'set'
  //react element must contain only single paternity element
  return (
    
    <Container>
      <Header setRadioValue={setRadioValue} radioValue={radioValue}/>
      <Body radioValue={radioValue} hourValue={hourValue}/>
      <Footer radioValue={radioValue} hourValue={hourValue} setHourValue={setHourValue}/>
      
      
    </Container>
  );
}

export default App;
