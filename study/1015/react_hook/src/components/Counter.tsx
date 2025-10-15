import {useState} from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    return (
    <div className="flex flex-col items-center w-full h-full">
        <div className="flex flex-col items-evenlt w-full">
            <button className ="w-10 h-10 bg-red-500" 
            onClick={() => setCount(count +1)}>
                +
            </button>
            <button className="w-10 h-10 bg-blue-500" 
            onClick={() => setCount(count -1)}>
                -
            </button>
        </div>
        <p className="w-10 h-10 bg-black text-white">{count}</p>
    </div>
    );
}