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
import {useSelector, useDispatch} from 'react-redux';
import { setCurrentPrice, setSelectedCountry } from '../services/stateService'
// import { Link } from 'react-router-dom';
import { useNavigate, useLocation} from 'react-router-dom';

function Header() {
  
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //useSelector hook helps to watch redux state and returns new value  
  //useSelector takes function in which whole redux state is recieved and needed state selected
  //useSelector launches components render when needed 
  const currentPrice = useSelector((state) => state.currentPrice);
  const selectedCountry = useSelector((state) => state.selectedCountry);
  //useDispatch function 
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
    navigate(event.currentTarget.value);
  }
  function handleOnSelectCountry(key, event) {
    dispatch(setSelectedCountry(countries.find(country => country.key === key)));
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
            checked={location.pathname.includes(radio.value) || (idx === 0 && location.pathname === '/')}
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