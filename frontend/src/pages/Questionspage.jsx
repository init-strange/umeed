import React from 'react'

import { useNavigate } from 'react-router-dom'

const Questionspage = () => {
  const navigate=useNavigate()
  return (
  <>
  <div>Questionspage</div>
    <button onClick={() => navigate('/analysis')}>
  
  Analysis Dekhein →
</button>
</>
  )
}

export default Questionspage