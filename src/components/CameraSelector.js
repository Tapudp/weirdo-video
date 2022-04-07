import React, { useState } from 'react';

const CameraSelector = ({ listOfOptions, handleCameraSelect, selectedDevice }) => {
  const [open, toggle] = useState(false);
  return (
    <div
      style={{ minWidth: 120 }}
      onClick={() => toggle(true)}
      className="cameraSelectContainer"
    >
      <div className='cameraToggle'>
        Click to see available list of Cameras
      </div>
      {open && <div
        className="cameraSelector"
      >
        {listOfOptions.map((device, idx) => (
          <div
            key={device.deviceId}
            className={`singleCamera ${device.deviceId === selectedDevice.deviceId ? 'selectedCam' : ''}`}
            value={device}
            onClick={() => handleCameraSelect(device)}
          >
            {device.label}
          </div>
        ))}
      </div>}
    </div>
    )
}

export default CameraSelector;