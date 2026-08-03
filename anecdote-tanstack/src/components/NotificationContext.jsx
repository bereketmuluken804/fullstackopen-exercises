import { createContext, useContext, useState } from "react";

const notificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [msg, setMsg] = useState(null);
	const setNotification = (msg) => {	
    setMsg(msg);
		setTimeout(() => {
				setMsg(null);
		}, 2000);
	};
	return (
		<notificationContext.Provider value={{msg, setNotification, setMsg }}>
			{children}
		</notificationContext.Provider>
	);
};

export const useNotifactionContext = () => {
	return useContext(notificationContext);
};

export default notificationContext;
