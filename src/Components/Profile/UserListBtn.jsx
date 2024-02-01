import React from 'react'

const UserListBtn = ({children, openedBlock, isLoading, setOpenedBlock, num, title}) => {
  return (
    <span className={`${openedBlock === num ? "bg-def-gray" : ""} ${isLoading ? "animate-pulse pointer-events-none" : ""}`}
        onClick={() => setOpenedBlock(num)}>
        {children}
        <p>{title}</p>
    </span>

  )
}

export default UserListBtn