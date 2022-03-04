import React, { useState } from 'react'

function App() {
  const [value,setValue] = useState('')
  const [data,setData] = useState(null)

  const handleClick = ()=>{
    fetch(`http://localhost:5000/api/${value}`)
    .then(res=>{
      return res.json()
    }).then(res=>{
      setData(res)
    })
    
  }
  return (
    <>
      <div>This is Copie</div>
      
        <input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
        <input type='submit' value="Search" onClick={()=>handleClick()}/>
      <div>
        {data?data.map(d=> <Data key={d.hexCode} name={d.name} code={d.hexCode}/>): 'nothing to show...'}
      </div>
    </>
    
  )
}

function Data({name, code})
{
  return(
    <div style={{'display':'flex', 'flexDirection': 'row'}}>
      <p>{name}</p>
      <p style={{'background':`${code}`}}>{code}</p>
    </div>
  )
}

export default App
