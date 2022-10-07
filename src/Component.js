import React,{useState} from "react";



// function FComponent() {
//     return (
//         <div>Hi from FComponent</div>
//     )
// }
const SComponent = (props) => {
    const [count, setCount] = useState(0); 
    return (
        <div>Hi from {props.firstName} {props.lastName} {count}
        <button onClick={()=> setCount(count + 1)}>+</button>
        <button onClick={()=> setCount(0)}>reset</button>
        </div>
    )
}

// class CComponent extends React.Component{       //class based react
//     render() {
//         return (
//             <div>Hi from CComponent</div>
//         )
//     }
// }


export default SComponent;