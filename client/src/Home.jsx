import React, { useState } from "react";
import {Button, Modal} from '@material-ui/core/';
import {Link} from "react-router-dom";
import './App.css';

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
          <ManualModalParent parentCallback={handleCallback}/>
        </div>
      </Modal>
      <Modal
        open={questionModal}
        onClose={handleCloseChild}
      >
        <div className="testModal">
          <QuestionModal detectedObject={detectedObject}/>
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

function ManualModalParent(props) {
  let {parentCallback} = props;
  const [detectedObject, setDetectedObject] = useState();
    
  let handleSubmit = () => {
    //this happens on success - send the detectedObject to the parent
    parentCallback(detectedObject);
  }

  return (
    <div>
      What is your item?
      <form>
        <p><Button variant="contained" onClick={() => {setDetectedObject("Bottle")}}>Jugs or Bottles</Button></p>     
        <p><Button variant="contained" onClick={() => {setDetectedObject("Containers")}}>Containers</Button></p>
        <p><Button variant="contained" onClick={() => {setDetectedObject("Textiles")}}>Textiles</Button></p>
        <p><Button variant="contained" onClick={() => {setDetectedObject("Electronics")}}>Electronics</Button></p>
      <label>
          Other: 
            <input type = "text" name="other" />
      </label>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  )
}

function QuestionModal(props) {
  let {detectedObject} = props;

  return (
    <div>
      Q&A for {detectedObject}
    </div>
  )
}

export default Home;
