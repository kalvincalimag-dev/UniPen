import React, { createContext, useContext, useEffect, useState, useRef } from 'react'

const NotificationContext = createContext();

let timeoutId;

export default function NotificationProvider({children}) {

    const [notification, setNotification] = useState({
        type: '',
        value: ''
    });
    const [backgroundColor, setBackgroundColor] = useState("bg-red");

    const notificationRef = useRef()

    const updateNotification = (type, value) => {
        if(!type || !value) return;
        if(timeoutId) clearTimeout(timeoutId);

        switch(type){
            case "error": 
                setBackgroundColor("bg-red");
                break;
            case "warning": 
                setBackgroundColor("bg-orange-400");
                break;    
            case "success": 
                setBackgroundColor("bg-green");
                break;
            default:
                setBackgroundColor("bg-red")        
        }
        setNotification({type, value})
        timeoutId = setTimeout(() => {
            setNotification({type: "", value: ""})
        }, 3000);
    }

    useEffect(() => {
        notificationRef.current?.classList.remove('bottom-14' , 'opacity-0')
        notificationRef.current?.classList.add('bottom-10' , 'opacity-1')
        //return () => {
            //notificationRef.current?.classList.add('bottom-14' , 'opacity-0')
            //notificationRef.current?.classList.remove('bottom-10' , 'opacity-1')
        //}
    }, [notification.value])

    return ( 
        <>
            <NotificationContext.Provider value={{ updateNotification }}>
                {children}
            </NotificationContext.Provider>

            {notification.value ? ( <p ref={notificationRef} className={` ${backgroundColor} rounded p-2 text-white fixed bottom-14 opacity-0 left-1/2 -translate-x-1/2 transition-all duration-150 ease-linear`}> {notification.value} </p> ) : null}
        </>  
    );
}

export const useNotification = () => useContext(NotificationContext)
