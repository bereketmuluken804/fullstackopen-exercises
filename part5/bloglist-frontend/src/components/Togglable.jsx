import { use } from "react";
import { useState, useImperativeHandle} from "react";

function Togglable({children, label, ref}) {
  const [visible, setVisible] = useState(false);
  
  function toggleVisibility() {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {toggleVisibility};
  })

  if(visible){
    return <div>
      {children}
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  }
  else {
    return <button onClick={toggleVisibility}>{label}</button>
  }
}

export default Togglable;