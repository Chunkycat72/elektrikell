import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Countdown from 'react-countdown';
import moment from 'moment';

function Low({hourValue, setHourValue, bestTimeRange,currentPrice}) {

    const [showElement, setShowElement] = useState('countdown');
    const [time, setTime] = useState(null);


    const cheapHours = [
        { label: '1h', value: 1 },
        { label: '2h', value: 2 },
        { label: '3h', value: 3 },
        { label: '4h', value: 4 },
        { label: '6h', value: 6 },
        { label: '8h', value: 8 },
      ];

      //useEffect - react hook that launches after whole component rendered.
      //useEffect - takes 2 arguments
      //1 - callback function that launches 
      //2 - array with dependencies 
      //dependencies - variables used in callback function 
      //in case of changes dependencies launch callback function again 
      //leaving dependency array empty - garanties that callback function will run only once, even if state changed.
      //aove is true in case state is not used in callback function

      useEffect(()=>{
            const countdownUntil = moment.unix(bestTimeRange.timestamp).toDate();
            setTime(countdownUntil);
      }, [bestTimeRange]);

    //object event contains information about element that was changed
      function handleOnChange(event) {
        const hour = event.currentTarget.value;

        if(bestTimeRange.timestamp > moment().unix()) {
            setShowElement('countdown');
        } else {
            setShowElement('Right now');
        }

        setHourValue(+hour);
      }

    //onChange - event trigger
    //event - arrives from browser, browser receives it from user
    //on Change launches when user made change in input elements
    //on Change launches function that we call handlers. Trigger sends event object to handler.
    //event trigger names start with 'on'
    return (
        <>
            <Row>
                <Col>
                    <ButtonGroup>
                        {cheapHours.map(hour => (
                            <ToggleButton
                                id={`hour-${hour.value}`}
                                key={hour.value}
                                type="radio"
                                name="hour"
                                value={hour.value}
                                checked={hourValue === hour.value}
                                onChange={handleOnChange}
                            >
                                    {hour.label}
                            </ToggleButton>
                        )) }
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>Parim aeg selleks on {`${bestTimeRange.from}:00st ${bestTimeRange.until}:00ni`}, milleni on jäänud</Col>
            </Row>
            <Row>
                <Col>
                    {showElement === 'countdown' && time ? <Countdown date={time} /> : <h3>Right Now!</h3>}
                </Col>
            </Row>
            <Row>
                <Col>Siis on kilovatt-tunni hind {bestTimeRange.bestPrice} eurot, 
                     mis on {Math.round(100 - bestTimeRange.bestPrice / currentPrice * 100)}% odavam kui praegu
                </Col>
            </Row>
        </>)
}

export default Low;