import './App.css';
import React, {useState} from 'react';
import WebcamStreamCapture from './components/WebStreamCapture';

const listOfFileNames = [
  'nw-15y-cali-nov-1',
  'nw-15y-cali-nov-2',
  'nw-15y-cali-nov-3',
  'nw-15y-cali-nov-4',
  'nw-15y-cali-nov-5',
  'nw-15y-cali-nov-6',
  'nw-15y-cali-nov-7',
  'nw-15y-cali-nov-8',
  'nw-15y-cali-nov-9',
  'nw-15y-cali-nov-10',
  'nw-15y-cali-nov-11',
  'nw-15y-cali-nov-12',
  'nw-15y-cali-nov-13',
  'nw-15y-cali-nov-14',
  'nw-15y-cali-nov-15'
];

function App() {
  const [currentlySelectedFile, selectFile] = useState({});

  return (
    <div className='mainApp'>
      <div className='fileSelectContainer'>
        File Selector
        <ul className='fileList'>
          {listOfFileNames.map((it, indx) => (
            <li
              key={indx}
              onClick={() => selectFile(it)}
              className='fileItem'
            >
              {it}
            </li>
          ))}
        </ul>
      </div>
      <div className='webcamContainer'>
        <WebcamStreamCapture
          currentlySelectedFile={currentlySelectedFile}
          selectFile={selectFile}
        />
      </div>
    </div>
  );
}

export default App;
