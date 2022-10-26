import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { getPriceData } from '../services/apiservice';
import ErrorModal from '../ErrorModal'
import moment from 'moment';



function Body({
  radioValue, 
  hourValue, 
  setBestTimeRange, 
  setWorstTimeRange,
  selectedCountry, 
}) {

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [hourNowi, setHourNow] = useState(0);
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);

  useEffect(() => {
    //opened async function that launches immediately (invoked function)
    (async function () {
    //try - attempts to execute eveything in it's scope
    //in case of error try stops and launches 'catch' scope, handing over the error
    try{  
        //check if there is api answer in component stat
        if(!response) {
        //if no, response is made and saved to component state
          const response = await getPriceData();
          setResponse(response.data);
          return; //prevents code from further execution
        }
        //once answer from api taken, coutry choosen by user is selected
        //on data array cycle map is used , which returns new array 
        let priceData = response[selectedCountry.key].map(dataObject => {
          //in cycle hours ('HH') are taken from timestamp and assigned x and y
          //y = price
          //x = time
          //timestamp = unix timestamp , time in seconds ftom 01/01/1970
          return {
            x: moment.unix(dataObject.timestamp).format('HH'),
            y: dataObject.price,
            timestamp: dataObject.timestamp,
          }
        });
        if(!data) {
          setData(priceData);
          return;
        }
        // look for index that contains current hour
        const hourNowi = priceData.findIndex(dataObject => {
          return dataObject.x === moment().format('HH');
        });
        setHourNow(hourNowi);
        
        //filter array so it would contain only future hours, as future time comes after 9th index
        const futureData = priceData.filter((v,i) => i >= 9);
        const areaPrices = [];
        
        //for example looking for 3 cheapest hours
        //launch loop for future hours 
        //every loop takes 3 hours/3 array elements, sums them, and writes into new array with current index
        //this way we get cheapest 3h range 

        futureData.forEach((v,i,arr)=>{
          const partData = arr.slice(i, i + hourValue + 1);
          if (partData.length === hourValue + 1) {
            let result = 0;
            for (const p of partData) result += p.y;
            areaPrices.push({ result, i });
          }
          return;
        });
        //sort by sum cheapest at first
        areaPrices.sort((a,b) => a.result - b.result);
        if(radioValue === 'low') {
            //if cheapest price needed
            //take future hours and search for object with price by first/cheapest index
            //compile our data for graph
          
        setBestTimeRange({
          from: futureData[areaPrices[0].i].x, 
          until: futureData[areaPrices[0].i + hourValue].x, 
          timestamp: futureData[areaPrices[0].i].timestamp,
          bestPrice: futureData[areaPrices[0].i].y,
        });
        } else {
          //if most expensive prices needed we reverse the array
          //now order is flipped , from expensive to cheapest
          areaPrices.reverse();
        setWorstTimeRange({
          from: futureData[areaPrices[0].i].x, 
          until: futureData[areaPrices[0].i + hourValue].x, 
          bestPrice: futureData[areaPrices[0].i].y,
        });
        }
        //add past into graph and assign points of selected range (3hours)
        setX1(9 + areaPrices[0].i);
        const x2 = 9 + areaPrices[0].i + hourValue;
        setX2(x2);

      } catch(error){
        setShowError(true);
        setErrorMessage(error.message);
      }
      
    })();
  }, [hourValue, data, setBestTimeRange, setWorstTimeRange, radioValue, response, selectedCountry]); 


  return (
    <>
    <Row>
      <Col>
        <ResponsiveContainer width="100%" height="100%" minHeight = "500px">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
            <ReferenceLine x={hourNowi} stroke="red"  />
            {
              radioValue === 'low'
              ? <ReferenceArea x1={x1} x2={x2}  stroke="green" fill="green" opacity={0.3} />
              : <ReferenceArea x1={x1} x2={x2}  stroke="red" fill="red" opacity={0.3} />
            }
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
    <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError}/>
    </>
  );
}

export default Body;