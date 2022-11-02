import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Low from './low';
import High from './high';
import { Route, Routes } from 'react-router-dom';
import { localUrl } from '../services/apiservice';

function Footer(props) {

   return (
    <div id='footer'>
        <Routes>
            <Route path={`${localUrl}/`} element={<Low {...props}/>}/>
            <Route path={`${localUrl}/low`} element={<Low {...props}/>}/>
            <Route path={`${localUrl}/low/:hours`} element={<Low {...props}/>}/>
            <Route path={`${localUrl}/high`} element={<High/>}/>
        </Routes>
    </div>
   )
    
}

export default Footer;