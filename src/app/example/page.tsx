'use client'
import { useState } from "react"

const ShowHide =()=> {

  const [isActivate, setActivate] = useState(false)

  const handleActivate = (e:any) => {
      !isActivate ? setActivate(true) : setActivate(false)
}

return (
  <div>
      <div>
          <h1 style={{cursor: 'pointer'}} onClick={handleActivate}>
              {isActivate === true ? 'OPEN' : false}
          </h1>
          <h1 style={{cursor: 'pointer'}} onClick={handleActivate}>
              {!isActivate ? 'CLOSE' : false}
          </h1>
      </div>
   </div>
  )
}
  export default ShowHide