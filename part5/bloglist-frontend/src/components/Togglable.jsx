import { useState } from "react";

function Togglable({children, label}) {
  const [visible, setVisible] = useState(false);
  
  if(visible){
    return <div>
      {children}
      <button onClick={()=> setVisible(false)}>Cancel</button>
    </div>
  }
  else {
    return <button onClick={()=>setVisible(true)}>{label}</button>
  }
}

export default Togglable;