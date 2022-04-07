import React from 'react';

const FileName = ({currentlySelectedFile, setCaptureCount, captureCount}) => {
    return (
        <div className='fileNameContainer'>
            <input
                className='fileNameInput'
                type={'text'}
                value={currentlySelectedFile}
                disabled
            ></input>
            <input
                className='fileCounterInput'
                type={'number'}
                value={captureCount}
                onChange={e => setCaptureCount(e.target.value)}
            ></input>
        </div>
    )
}

export default FileName;