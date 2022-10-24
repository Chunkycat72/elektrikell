import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {getCurrentPrice} from '../services/apiservice';
import ErrorModal from '../ErrorModal'

function Header({
  currentPrice, 
  setCurrentPrice, 
  radioValue, 
  setRadioValue,
  selectedCountry,
  setSelectedCountry,
}) {
  
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const countries = [
    {key: 'ee', title: 'Eesti'},
    {key: 'fi', title: 'Soome'},
    {key: 'lv', title: 'Lati'},
    {key: 'lt', title: 'Ledu'},
  ]

  useEffect(() => {
      (async function() {
      try {
        const response = await getCurrentPrice();
        setCurrentPrice(response.data[0].price);
      } catch(error) {
          setShowError(true);
          setErrorMessage(error.message);
      }
      
      }) ();
  }, [setCurrentPrice]); 


  const radios = [
    { name: 'Low price', value: 'low' },
    { name: 'High price', value: 'high' },
  ];

  function handleOnChangePrice(event){
    //event.preventDefault();
    setRadioValue(event.currentTarget.value);
  }
  function handleOnSelectCountry(key, event) {
    setSelectedCountry(countries.find(country => country.key === key));
  }

  return (
    
    <>
       <Row>
        <Col> <h3>Elektrikell</h3></Col>
        <Col>
        <DropdownButton
            key="secondary"
            id={`dropdown-variants-secondary`}
            variant="secondary"
            onSelect={handleOnSelectCountry}
            title={selectedCountry.title}
          >
            {countries.map(country => <Dropdown.Item key={country.key} eventKey={country.key}>{country.title}</Dropdown.Item>)}

          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col>Status</Col>
        <Col> 
        <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-danger' : 'outline-success'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={handleOnChangePrice}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
        </Col>
        <Col>Hind {currentPrice}eur MWh/h</Col>
      </Row> 
      <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError}/>
      </>)}

export default Header;