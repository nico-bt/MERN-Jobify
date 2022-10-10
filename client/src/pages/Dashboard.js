import React, { useEffect } from 'react'

function Dashboard() {
  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch("/api/jobs")
      const data = await response.json()
      console.log(data);
    }
    fetchData()
  }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard