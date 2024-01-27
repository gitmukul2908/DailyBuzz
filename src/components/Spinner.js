import React from 'react'
import loading from '../loading.gif'

const Spinner = () => {

    return (
      <div className='text-center'>
        <img src={loading} alt="loading" style={{backgroundColor: 'white', height: '5rem', width: '5rem'}}/>
      </div>
    )
}

export default Spinner
