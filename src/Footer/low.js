import React from 'react';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Countdown from 'react-countdown';
import moment from 'moment';
import './footer.scss';
import {useSelector, useDispatch} from 'react-redux';
import { setHourValue} from '../services/stateService'
import { useParams, useNavigate} from 'react-router-dom'

function Low() {

    const [showElement, setShowElement] = useState('countdown');
    const [time, setTime] = useState(null);
    const hourValue = useSelector((state) => state.hourValue);
    const currentPrice = useSelector((state) => state.currentPrice);
    const bestTimeRange = useSelector((state) => state.bestTimeRange);
    const { hours } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cheapHours = [
        { label: '1h', value: 1 },
        { label: '2h', value: 2 },
        { label: '3h', value: 3 },
        { label: '4h', value: 4 },
        { label: '6h', value: 6 },
        { label: '8h', value: 8 },
      ];

      useEffect(()=>{
            const countdownUntil = moment.unix(bestTimeRange.timestamp).toDate();
            setTime(countdownUntil);
            dispatch(setHourValue(+hours) || 1);
      }, [bestTimeRange, hours, dispatch]);

    //object event contains information about element that was changed
      function handleOnChange(event) {
        const hour = event.currentTarget.value;
        //dispatch(setHourValue(hour));
        if(bestTimeRange.timestamp > moment().unix()) {
            setShowElement('countdown');
        } else {
            setShowElement('Right now');
        }
        navigate('/low/'+ hour);
        dispatch(setHourValue(+hour));
      }

    //onChange - event trigger
    //event - arrives from browser, browser receives it from user
    //on Change launches when user made change in input elements
    //on Change launches function that we call handlers. Trigger sends event object to handler.
    //event trigger names start with 'on'
    return (
        <div className="text-center">
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
        </div>)
}

export default Low;