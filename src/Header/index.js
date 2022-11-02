import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {getCurrentPrice, localUrl} from '../services/apiservice';
import ErrorModal from '../ErrorModal'
import {useSelector, useDispatch} from 'react-redux';
import { setCurrentPrice, setSelectedCountry } from '../services/stateService'
// import { Link } from 'react-router-dom';
import { useNavigate, useLocation} from 'react-router-dom';

function Header() {
  
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const currentPrice = useSelector((state) => state.currentPrice);
  const selectedCountry = useSelector((state) => state.selectedCountry);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const countries = [
    {key: 'ee', title: 'Eesti'},
    {key: 'fi', title: 'Soome'},
    {key: 'lv', title: 'Lati'},
    {key: 'lt', title: 'Ledu'},
  ]

  useEffect(() => {
      (async function() {
      try {
        const response = await getCurrentPrice(selectedCountry);
        dispatch(setCurrentPrice(response.data[0].price));
      } catch(error) {
          setShowError(true);
          setErrorMessage(error.message);
      }
      
      }) ();
  }, [dispatch, selectedCountry]); 


  const radios = [
    { name: 'Low price', value: '/low' },
    { name: 'High price', value: '/high' },
  ];

  function handleOnChangePrice(event){
    //event.preventDefault();
    navigate(localUrl + event.currentTarget.value);
  }
  function handleOnSelectCountry(key, event) {
    dispatch(setSelectedCountry(countries.find(country => country.key === key)));
  }

  return (
    
    <>
       <Row>
        <Col> <h3 class="text-primary">Elektrikell <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
  <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
</svg></h3></Col>
        <Col>
        <DropdownButton
            key="secondary"
            id={`dropdown-variants-secondary`}
            variant="secondary"
            onSelect={handleOnSelectCountry}
            title={selectedCountry.title}
            className="float-end"
          >
            {countries.map(country => <Dropdown.Item key={country.key} eventKey={country.key}>{country.title}</Dropdown.Item>)}
          
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col>Status</Col>
        <Col className="text-center"> 
        {/* <Link to='/high'>show High Price</Link>
        <Link to='/low'>show Low Price</Link> */}
        <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-danger' : 'outline-success'}
            name="radio"
            value={radio.value}
            checked={location.pathname.includes(radio.value) || (idx === 0 && !location.pathname.includes('/low') && !location.pathname.includes('/high'))}
            onChange={handleOnChangePrice}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
        </Col>
        <Col className="text-end">Hind {currentPrice}eur MWh/h</Col>
      </Row> 
      <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError}/>
      </>)}

export default Header;