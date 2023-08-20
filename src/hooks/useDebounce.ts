import { useEffect, useState } from "react"

export const useDebounce = (value,d=500) =>{
    const [debounce,setDebounce] = useState(value);

    useEffect(()=>{
        const timeoute = setTimeout(()=>{
            setDebounce(value);
        },d);
        return clearInterval(timeoute);
    },[value,d]);

    return debounce;

}