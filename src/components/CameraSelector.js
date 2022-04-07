import React from 'react';
import Webcam from 'react-webcam';

const CameraSelector = ({ listOfCameras, handleCameraSelect, selectedDevice }) => {
  return (
    <div className="cameraSelectContainer">
      <div className='cameraToggle'>
        Available list of Cameras
      </div>
      <div
        className="cameraSelector"
      >
        {listOfCameras.map((device, idx) => (
          <div
            key={device.deviceId}
            className={`singleCamera ${device.deviceId === selectedDevice.deviceId ? 'selectedCam' : ''}`}
            value={device}
            onClick={() => handleCameraSelect(device)}
          >
            {device.label}
          </div>
        ))}
      </div>
    </div>
    )
}

export default CameraSelector;