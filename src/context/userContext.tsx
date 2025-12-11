import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext<any>(null)

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
const useAuth = () => React.useContext(UserContext)
// eslint-disable-next-line react-refresh/only-export-components
export { useAuth }
