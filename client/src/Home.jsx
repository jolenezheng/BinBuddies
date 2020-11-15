import React, { useState } from "react";
import {Button, Modal, Typography} from '@material-ui/core/';
import {Link} from "react-router-dom";
import './App.css';
import history from './history';
import defaultImage from './imgs/photo.jpg';
import ImageUploader from 'react-images-upload';
import defaultImage from './box.png';
import PlasticForm from './PlasticForm';

function Home(props) {
  //closed by default
  const [uploadModal, setUploadModal] = useState(false);
  const [manualModal, setManualModal] = useState(false);
  const [detectedObject, setDetectedObject] = useState(null);

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

  let handleCallback = (data) => {
    //set object here too - this could be used for the image and manual modals
    //data is what the child sent - now u can use that in the q&a modal
    setDetectedObject(data);
    // open the q&a modal, close parents
    handleCloseParent();
  }
  
  if (detectedObject) {
    return (
      <FetchModal detectedObject={detectedObject}/>
    )
  }

  return(
    <div className="welcomeScreen">
      {/* Take a Photo */}
      <Button className="welcomeUpload" variant="contained" onClick={handleUploadModal}>Upload a Photo</Button>
      <Button className="welcomeManual" onClick={handleManualModal}>Manual Submission</Button>
      <Modal
        open={uploadModal}
        onClose={handleCloseParent}
      >
        <div>
          <ImageModalParent parentCallback={handleCallback} />
        </div>
      </Modal>
      <Modal
        open={manualModal}
        onClose={handleCloseParent}
      >
        <div>
          <ManualModalParent parentCallback={handleCallback}/>
        </div>
      </Modal>
    </div>
  )
}

function ImageModalParent(props) {
  // modal for UPLOADING image
  let [selectedImage, setSelectedImage] = useState();

  let handleUpload = () => {
      //    {/* image uploading would be here - select the image here somehow */}
      // {/* do we just wanna put a fake image of choosing a picture? */}
    setSelectedImage(defaultImage);
  }

  return (
    <div className="uploadModal">
      
      {/* preview image */}
      {selectedImage ? (
        <div className="uploadModalImage">
          <img src={selectedImage}/>
        </div>
      ) : (
        
        <div className="pic-upload">
            {/* <Button className="uploadModalSelect" variant="contained" onClick={handleUpload}>
              Select a picture
            </Button> */}
            <ImageUploader className="uploadModalSelect"
              withIcon={true}
              buttonText='Select Image'
              onChange={handleUpload}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
        </div>
        // TODO: make uploaded picture ../img/photo.jpg
      )}
      <Link 
        to={{
            pathname: "/photoUpload",
            state: { image: defaultImage }
          }}
        >
          <Button className="uploadModalUpload" variant="contained">Upload</Button>
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

  // buttons don't submit unless you press submit
  return (
    <div className="manualModal">
      <form>
        <p className="manualOne"><Button variant="contained" onClick={() => {setDetectedObject("bottles")}}>Jugs or Bottles</Button></p>     
        <p className="manualTwo"><Button variant="contained" onClick={() => {setDetectedObject("containers")}}>Containers</Button></p>
        <p className="manualThree"><Button variant="contained" onClick={() => {setDetectedObject("electronics")}}>Electronics</Button></p>
        <p className="manualFour"><Button variant="contained" onClick={() => {setDetectedObject("textiles")}}>Textiles</Button></p>
        <input className="manualEntry" type = "text" name="other" />
        <div className="manualSubmit">
          <Button  variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  )
}

export function FetchModal(props) {
  let {detectedObject} = props;

  let currentObject = (detectedObject || props.history.location.state || "box"); // result from image api

  let [init, setInit] = useState(false);
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

  let url = `https://data.edmonton.ca/resource/gtej-pcij.json?$where=material_title like '%25${currentObject}%25'`;
  if (predefined.includes(currentObject)) {
        //|| 'box') // COMMENT IN TO ACCESS QS FLOW

    // go straight to question/answer flow
    return (<QuestionModal detectedObject={currentObject}/>)
  } else {
    if (!init) {
      fetchResults(url);
    }
  }

  if (data && data.length === 1) {
    // go to next... i dont think this works
    history.push('/final');
  }

  if (!init) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="resultOptions">
      <div className="resultOptionsScroll">
      {data && (data.length > 1) 
        && data.map((data, i) => {
          return (
            <Link 
                to={{
                    pathname: "/final",
                    state: { title: data["material_title"], result: data["stream_title"], info: data["special_instructions"]}
                  }}
                  className="resultOptionsButton"
            >
              <Button>
                {data["material_title"]}
              </Button>
            </Link>
          )
      })}
      </div>
    </div>
  )
}

function QuestionModal(props) {
  let {detectedObject, parentCallback} = props;
  let [result, setResult] = useState(null); // "r" or "w"
  let [nextStep, setNextStep] = useState(); // 'follow up', 'next', or 'material'
  let [materialType, setMaterialType] = useState();
  let [materialStream, setMaterialStream] = useState();

  // assuming these are the only options we will handle:
  // container, jug, bottle, electronic, propane tanks, textiles
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

    // Qs for Item types (Step 1)
    if (detectedObject === 'box' || detectedObject === 'containers') {
      content = (
        <div>
          {containerContent[0]}
          <Button variant="contained" onClick={() => setNextStep('material')}>Yes</Button>
          <Button variant="contained" onClick={() => setNextStep('follow up')}>No</Button>
        </div>
      )
      if (nextStep === 'follow up') {
        content = (
          <div>
            {containerContent[1]}
            <Button variant="contained" onClick={() => setNextStep('material')}>All Done!</Button>
          </div>
        )
      }
    }
    else if (detectedObject === 'jugs' || detectedObject === 'bottles') {
      content = (
        <div>
          {jugContent[0]}
          <Button variant="contained" onClick={() => setNextStep('follow up')}>Yes</Button>
          <Button variant="contained" onClick={() => setNextStep('next')}>No</Button>
        </div>
      ) 
      if (nextStep === 'follow up') {
          content = (
            <div>
              {jugContent[1]}
              <Button variant="contained" onClick={() => setNextStep('next')}>All Done!</Button>
            </div>
          )
      } if (nextStep === 'next') {
          content = (
            <div>
              {jugContent[2]}
              <Button variant="contained" onClick={() => setNextStep('material')}>Yes</Button>
              <Button variant="contained" onClick={() => setResult('w')}>No</Button>
            </div>
          )
        }
    }
    else if (detectedObject === 'electronics' || detectedObject === 'propane tanks') {
      content = (
        <div>
          Look for the closest disposal center near you! (google maps?)
        </div>
      )
    }
    else {
      setNextStep('material');
    }

    //Material Qs
    if (nextStep === 'material') {
      content = (
        <div className="materialPage">
          <div className="spacer1">
              <Button className="glassButton" className="materialButton" variant="contained" onClick={() => setMaterialType('glass')}>Glass</Button>
              <Button className="plasticButton" className="materialButton" variant="contained" onClick={() => setMaterialType('plastic')}>Plastic</Button>
              <Button className="metalButton" className="materialButton" variant="contained" onClick={() => setResult('r')}>Metal</Button>
              <Button className="paperButton" className="materialButton" variant="contained" onClick={() => setMaterialType('paper')}>Paper</Button>
              <Button className="styrofoamButton" className="materialButton" variant="contained" onClick={() => setResult('w')}>Styrofoam</Button>
          </div>
        </div>
      ) 
      if (materialType === 'glass') {
        content = (
          <div className="glass">
            <div className = "spacer">
              <Button className="yesContainer" variant="contained" onClick={() => setResult('w')}>Yes</Button>
              <Button className="noContainer" variant="contained" onClick={() => setResult('r')}>No</Button>
            </div>
          </div>
        )
      } else if (materialType === 'plastic') {
        content = (
          <Button variant="contained" onClick={() => setResult('w')}>1</Button>
        )
      } else if (materialType === 'paper') {
        content = (
          <div className = "wax">
            <div className = "spacer">
              <Button className="yesContainer" variant="contained" onClick={() => setResult('w')}>Yes</Button>
              <Button className="noContainer" variant="contained" onClick={() => setResult('r')}>No</Button>
            </div>
          </div>
        )
      }
    }

    // This if statement is not working rn
    if (result === ('r' || 'w')) {
      <div>
        Your {detectedObject} is {result}.
      </div>
    }

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

  console.log(result.includes("Recyc"));

  return (
    <div className="finalScreen">
    <h3>
      {result.includes("Recyc") ? "Your item is recyclable!" : "Your item is not recyclable"}
    </h3>
    <div className="finalDesc">
      <h1>
        {result}
      </h1>
      <body>
        {info}
      </body>
    </div>
    <div className="finalButton">
      <Link to="/home">
        Start Over
      </Link>
    </div>
    </div>
  )
}

export default Home;
