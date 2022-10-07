import React,{useState,useEffect} from "react";



const Counter = (props) => {
    const [count, setCount] = useState(0); 

    
    useEffect(() => {
        if (count >= 1) {
        setInterval(() => {setCount(count + 1);
          if( count == 60){
            setCount(1);
        }
      }, 1000);
        } 
      });
    
 
    return (
        <div>
      {count<10? "0"+count:count} <button onClick={()=> setCount(1)}>start </button>
      
      </div>)
  
}



export default Counter;