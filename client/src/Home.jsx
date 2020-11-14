import React, { useState } from "react";
import {Button, Modal} from '@material-ui/core/';
import {Link} from "react-router-dom";
import './App.css';
import containerprompt from './imgs/containerprompt.png'

function Home(props) {
  //closed by default
  const [uploadModal, setUploadModal] = useState(false);
  const [manualModal, setManualModal] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const [detectedObject, setDetectedObject] = useState();

  const handleUploadModal = () => {
    setUploadModal(true);
  }

  const handleManualModal = () => {
    setManualModal(true);
  }

  const handleCloseParent = () => {
    setManualModal(false);
    setUploadModal(false);
  }

  const handleCloseChild = () => {
    setQuestionModal(false);
  }

  let handleCallback = (data) => {
    //set object here too - this could be used for the image and manual modals
    //data is what the child sent - now u can use that in the q&a modal
    setDetectedObject(data);
    // open the q&a modal, close parents
    handleCloseParent();
    setQuestionModal(true);
	} 

  return(
    <div>
      <Link to="/">
        <Button variant="contained">Logout</Button>
      </Link>
      Home
      <Button variant="contained" onClick={handleUploadModal}>Upload pic</Button>
      <Button variant="contained" onClick={handleManualModal}>Manual</Button>
      <Modal
        open={uploadModal}
        onClose={handleCloseParent}
      >
        <div className="testModal">
          <ImageModalParent parentCallback={handleCallback} />
        </div>
      </Modal>
      <Modal
        open={manualModal}
        onClose={handleCloseParent}
      >
        <div className="testModal">
          <ManualModalParent />
        </div>
      </Modal>
      <Modal
        open={questionModal}
        onClose={handleCloseChild}
      >
        <div className="testModal">
          <QuestionModal detectedObject={detectedObject} parentCallback={handleCloseChild}/>
        </div>
      </Modal>
    </div>
  )
}

function ImageModalParent(props) {
  let {parentCallback} = props;
  const [detectedObject, setDetectedObject] = useState();
  
  let handleSubmit = () => {
    //this happens on success - send the detectedObject to the parent
    parentCallback(detectedObject);
  }

  let handleUpload = () => {
    // upload the image to the google thing, get the result
    //set the detected object below to the state
    setDetectedObject('box');
  }
  if (detectedObject) {
    return (
      <div>
        Is {detectedObject} the item you submitted?
        <Button variant="contained" onClick={handleSubmit}>Yes</Button>
        <Button variant="contained" onClick={() => setDetectedObject(null)}>No</Button>
      </div>
    )
  }
  // default - no object detected yet
  return (
    <div>
      Upload picture (google cloud)
      {/* image uploading would be here */}
      <Button variant="contained" onClick={handleUpload}>Upload</Button>
    </div>
  )
}

function ManualModalParent() {
  return (
    <div>
      Manual entry (form)
    </div>
  )
}

// the styling for questions can go here for now?
function QuestionModal(props) {
  let {detectedObject, parentCallback} = props;
  let [result, setResult] = useState(); // "R" or "W"
  let [materialModal, setMaterialModal] = useState(false);

  // assuming these are the only options we will handle:
  // container, jug, bottle, electronic, propane tanks
  // other will get handled differently
  let containerContent = [
    "Is the container empty and dry?",
    "Please dry the container"
  ];

  let jugContent = [
    "Is there a straw or lid?",
    "Please separate the straw and lid and send them to waste",
    "Is it less than 5 liters?"
  ]

  // button to go to next step
  let finishButton = (
    <Button variant="contained" onClick={() => setMaterialModal(true)}>Finish</Button>
  )

  //default
  let content = (<div>Next results</div>)

  if (detectedObject === 'box') {
    content = (
      <div>
        {containerContent[0]}
        {/* when buttons are clicked, should go to next page */}
        <Button variant="contained">Yes</Button>
        <Button variant="contained">No</Button>
        {finishButton}
      </div>
    )
  }

  if (detectedObject === 'jug' || detectedObject === 'bottle') {
    content = (
      <div>
        {jugContent[0]}
        <Button variant="contained">Yes</Button>
        <Button variant="contained">No</Button>
        {finishButton}
      </div>
    )
  }

  if (detectedObject === 'electronic' || detectedObject === 'propane tank') {
    content = (
      <div>
        Look for the closest disposal center near you! (google maps?)
        {finishButton}
      </div>
    )
  }

  // why are we asking what material is this?

  return (
    <div >
      {content}
      <Modal 
        open={materialModal}
        onClose={parentCallback}
      >
        <div className="testModal">
          <MaterialModal detectedObject={detectedObject}/>
        </div>
      </Modal>
    </div>
  )
}

// The API calls can go here for now? We can rearrange stuff later
function MaterialModal(props) {
  let {detectedObject} = props;

  return (
    <div>
      something
    </div>
  )
}

export default Home;
