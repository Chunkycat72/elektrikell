import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './index.scss';
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
    {key: 'lv', title: 'Läti'},
    {key: 'lt', title: 'Leedu'},
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
        <Col> <h3 class="text-primary">Elektrikell <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightning-charge" viewBox="0 0 16 16">
  <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"/>
</svg></h3>
        </Col>
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