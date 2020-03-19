import {useState, useEffect} from 'react';

const usePersistedState = (key, initialValue) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      let v = JSON.parse(localStorage.getItem(key));
      if(!v)
        v = initialValue;
      
      setValue(v);
    }, []);

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
    
  };

  export default usePersistedState;