import React, { useEffect, useState } from 'react'

const useApiAuth = () => {
  const [authMsg, setAuthMsg] = useState<string>("");

  useEffect(() => {
    function checkOutAuth () {
      const AUTH = localStorage.getItem("AUTH");
      if (AUTH) {
        setAuthMsg(AUTH);
        console.log(AUTH)
      }
    }

    window.addEventListener('storage', checkOutAuth)

    return () => {
      window.removeEventListener('storage', checkOutAuth);
    }
    
  }, [])
  
  return authMsg;
}

export default useApiAuth;