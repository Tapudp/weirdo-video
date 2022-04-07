import React from 'react';
import CameraSelector from './CameraSelector';
import FileName from './FileName';
import Webcam from 'react-webcam';

const WebcamStreamCapture = ({currentlySelectedFile, selectFile}) => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [selectedDevice, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);
    const [captureCount, setCaptureCount] = React.useState(0);
  
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      // setCaptureCount(p => p + 1);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = `${currentlySelectedFile}-${captureCount}.webm`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    }, [recordedChunks]);
  
    const handleDevices = React.useCallback(
      mediaDevices =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
      [setDevices]
    );
  
    React.useEffect(
      () => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
      },
      [handleDevices]
    );
  
  const handleCameraSelect = (device) => {
    selectFile(`nw-15y-cali-nov-${captureCount}`)
    setDeviceId(p => p.deviceId === device.deviceId ? {} : device)
  }
  
    return (
      <>
        <div>
          <CameraSelector
            listOfOptions={devices}
            selectedDevice={selectedDevice}
            handleCameraSelect={handleCameraSelect}
          />
          {selectedDevice.deviceId !== undefined
            ? <Webcam audio={false} ref={webcamRef} videoConstraints={{ deviceId: selectedDevice.deviceId }} />
            : <div>Choose a camera from the list</div>
          }
        </div>
        {selectedDevice.deviceId !== undefined ?
          <>
            <button
              className='shantoBtn deleteBtn'
              disabled={recordedChunks.length === 0}
              onClick={() => setRecordedChunks([])}
            >
              Delete
            </button>
            <button
              className='shantoBtn downloadBtn'
              onClick={handleDownload}
              disabled={recordedChunks.length === 0}
            >
              Download
            </button>
            {capturing ? (
              <button
                className="shantoBtn stopCapture"
                onClick={handleStopCaptureClick}
              >
                Stop Capture
              </button>
            ) : (
                <button
                  className='shantoBtn startCapture'
                  onClick={handleStartCaptureClick}
                >
                  Start Capture
                </button>
            )}
            <FileName
              currentlySelectedFile={currentlySelectedFile}
              selectFile={selectFile}
              captureCount={captureCount}
              setCaptureCount={setCaptureCount}
            />
          </>
          : null}
      </>
    );
};
  
export default WebcamStreamCapture;