const Notification = ({msg}) => {
   if (!msg)
      return
   return (
      <div className="error">
         {msg}
      </div>
   )
}

export default Notification