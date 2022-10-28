import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Low from './low';
import High from './high';
import { Route, Routes } from 'react-router-dom';

function Footer(props) {

   return (
    <div id='footer'>
        <Routes>
            <Route path='/' element={<Low {...props}/>}/>
            <Route path='/low/' element={<Low {...props}/>}/>
            <Route path='/low/:hours' element={<Low {...props}/>}/>
            <Route path='/high' element={<High/>}/>
        </Routes>
    </div>
   )
    
}

export default Footer;