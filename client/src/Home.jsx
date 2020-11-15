import React, { useState } from "react";
import {Button, Modal} from '@material-ui/core/';
import {Link} from "react-router-dom";
import './App.css';
import history from './history';
import defaultImage from './box.png';

function Home(props) {
  let {result} = props.history.location.state; // result from image api

  //closed by default
  const [uploadModal, setUploadModal] = useState(false);
  const [manualModal, setManualModal] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const [detectedObject, setDetectedObject] = useState(result || null);

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
  
  if (detectedObject) {
    return (
      <FetchModal detectedObject={detectedObject} parentCallback={handleCloseChild}/>
    )
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
    </div>
  )
}

function ImageModalParent(props) {
  let {parentCallback} = props;
  const [detectedObject, setDetectedObject] = useState();
  let [selectedImage, setSelectedImage] = useState();
  
  let handleSubmit = () => {
    //this happens on success - send the detectedObject to the parent
    parentCallback(detectedObject);
  }

  let handleUpload = () => {
      //    {/* image uploading would be here - select the image here somehow */}
      // {/* do we just wanna put a fake image of choosing a picture? */}
    setSelectedImage(defaultImage);
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
      <Button variant="contained" onClick={handleUpload}>
        Select a picture
      </Button>
      <Link 
        to={{
            pathname: "/testAPI",
            state: { image: defaultImage }
          }}
        >
          <Button variant="contained">Upload</Button>
      </Link>
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

function FetchModal(props) {
  let {detectedObject, parentCallback} = props;
  let [init, setInit] = useState(false);
  let [isPredefined, setIsPredefined] = useState(false);
  let [data, setData] = useState();
  let predefined = ["containers", "jugs", "bottles", "electronics", "propane tanks"];

  let fetchResults = (URL) => {
    fetch(URL, {
      method: 'GET',
    })
    .then(res => res.json())
    .then((json) => {
      setData(json);
      setInit(true);
    })
    .catch((e) => console.log(e));
  }

  let url = `https://data.edmonton.ca/resource/gtej-pcij.json?$where=material_title like '%25${detectedObject}%25'`;
  if (predefined.includes(detectedObject)) {
    // go straight to question/answer flow
    return (<QuestionModal detectedObject={detectedObject} parentCallback={parentCallback}/>)
  } else {
    if (!init) {
      fetchResults(url);
    }
  }

  if (data && data.length === 1) {
    // go to next... i dont think this works
    history.push('/final');
  }

  return (
    <div>
      {data && (data.length > 1) 
        && data.map((data, i) => {
          return (
            <Link 
                to={{
                    pathname: "/final",
                    state: { title: data["material_title"], result: data["stream_title"], info: data["special_instructions"]}
                  }}
            >
              <Button>
                {data["material_title"]}
              </Button>
            </Link>
          )
      })}
    </div>
  )
}

// the styling for questions can go here for now?
function QuestionModal(props) {
  let {detectedObject, parentCallback} = props;
  let [result, setResult] = useState(); // "R" or "W"
  let [materialStream, setMaterialStream] = useState();

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

  if (materialStream) {
    return (
      <div>
        We recommend: {materialStream}
      </div>
    )
  }

  //default
  let content = (<div>Next results</div>)

  if (detectedObject === 'box') {
    content = (
      <div>
        {containerContent[0]}
        {/* when buttons are clicked, should go to next page */}
        <Button variant="contained">Yes</Button>
        <Button variant="contained">No</Button>
      </div>
    )
  }

  if (detectedObject === 'jug' || detectedObject === 'bottle') {
    content = (
      <div>
        {jugContent[0]}
        <Button variant="contained">Yes</Button>
        <Button variant="contained">No</Button>
      </div>
    )
  }

  if (detectedObject === 'electronic' || detectedObject === 'propane tank') {
    content = (
      <div>
        Look for the closest disposal center near you! (google maps?)
      </div>
    )
  }

  // why are we asking what material is this?

  return (
    <div>
      <h1>Follow Up Questions: {detectedObject}</h1>
      {content}
    </div>
  )
}

export function FinalResult(props) {
  // if passing through link
  // <Link 
  //     to={{
  //         pathname: "/final",
  //         state: { title: ..., result: ..., info: ...}
  //       }}
  // >
  // content here
  // </Link>
  let {title, result, info} = props.history.location.state;

  return (
    <div>
    <h1>
      {title}
    </h1>
    We suggest:
    <p>
      {result}
    </p>
    <p>
      {info}
    </p>
    <Link to="/home">
      Start Over
    </Link>
    </div>
  )
}

export default Home;
