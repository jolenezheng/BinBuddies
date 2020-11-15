import React, { useState } from "react";
import {Button, Modal} from '@material-ui/core/';
import {Link} from "react-router-dom";
import './App.css';
import history from './history';
import defaultImage from './box.png';

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
  // let {parentCallback} = props;
  // const [detectedObject, setDetectedObject] = useState();
  let [selectedImage, setSelectedImage] = useState();
  
  // let handleSubmit = () => {
  //   //this happens on success - send the detectedObject to the parent
  //   parentCallback(detectedObject);
  // }

  let handleUpload = () => {
      //    {/* image uploading would be here - select the image here somehow */}
      // {/* do we just wanna put a fake image of choosing a picture? */}
    setSelectedImage(defaultImage);
  }

  // if (detectedObject) {
  //   return (
  //     <div>
  //       Is {detectedObject} the item you submitted?
  //       <Button variant="contained" onClick={handleSubmit}>Yes</Button>
  //       <Button variant="contained" onClick={() => setDetectedObject(null)}>No</Button>
  //     </div>
  //   )
  // }
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
        <p><Button variant="contained" onClick={() => {setDetectedObject("bottles")}}>Jugs or Bottles</Button></p>     
        <p><Button variant="contained" onClick={() => {setDetectedObject("containers")}}>Containers</Button></p>
        <p><Button variant="contained" onClick={() => {setDetectedObject("textiles")}}>Textiles</Button></p>
        <p><Button variant="contained" onClick={() => {setDetectedObject("electronics")}}>Electronics</Button></p>
      <label>
          Other: 
            <input type = "text" name="other" />
      </label>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  )
}

export function FetchModal(props) {
  let {detectedObject} = props;

  let currentObject = (props.history.location.state || detectedObject || "jugs"); // result from image api

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
  if (predefined.includes(currentObject) || 'jugs') // COMMENT IN TO ACCESS QS FLOW
  {
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

function QuestionModal(props) {
  let {detectedObject, parentCallback} = props;
  let [result, setResult] = useState(null); // "r" or "w"
  let [nextStep, setNextStep] = useState(); // 'follow up', 'next', or 'material'
  let [materialType, setMaterialType] = useState();
  let [materialStream, setMaterialStream] = useState();
  let [SPI, setSPI] = useState();

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
        <div className = "isEmptyCleanDryModal" >
          <Button className="yesButtonQ" onClick={() => setNextStep('material')}>Yes</Button>
          <Button className="noButtonQ" onClick={() => setNextStep('follow up')}>No</Button>
        </div>
      )
      if (nextStep === 'follow up') {
        content = (
          <div className = "emptyCleanDryModal">
            <Button className="allDoneButtonQ" onClick={() => setNextStep('material')}>All Done!</Button>
          </div>
        )
      }
    }
    else if (detectedObject === 'jugs' || detectedObject === 'bottles') {
      content = (
        <div className = "isStrawOrLidModal">
          <Button className="yesButtonQ" onClick={() => setNextStep('follow up')}>Yes</Button>
          <Button className="noButtonQ" onClick={() => setNextStep('next')}>No</Button>
        </div>
      ) 
      if (nextStep === 'follow up') {
          content = (
            <div className="lidsOutModal">
              {jugContent[1]}
              <Button className="allDoneButtonQ" onClick={() => setNextStep('next')}>All Done!</Button>
            </div>
          )
      } if (nextStep === 'next') {
          content = (
            <div className = 'litersModal'>
              <Button className="yesButtonQ" onClick={() => setNextStep('material')}>Yes</Button>
              <Button className="noButtonQ" onClick={() => setResult('w')}>No</Button>
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
        <div>
          What material is your item made of?
          <Button variant="contained" onClick={() => setMaterialType('glass')}>Glass</Button>
          <Button variant="contained" onClick={() => setMaterialType('plastic')}>Plastic</Button>
          <Button variant="contained" onClick={() => setResult('r')}>Metal</Button>
          <Button variant="contained" onClick={() => setMaterialType('paper')}>Paper</Button>
          <Button variant="contained" onClick={() => setResult('w')}>Styrofoam</Button>
        </div>
      ) 
      if (materialType === 'glass') {
        content = (
          <div>
            Is it broken?
            <Button variant="contained" onClick={() => setResult('w')}>Yes</Button>
            <Button variant="contained" onClick={() => setResult('r')}>No</Button>
          </div>
        )
      } else if (materialType === 'plastic') {
        content = (
          <div>
            What is the SPI number shown on your item?
            <Button variant="contained" onClick={() => setSPI('1')}>1</Button>
            <Button variant="contained" onClick={() => setSPI('2')}>2</Button>
            <Button variant="contained" onClick={() => setSPI('3')}>3</Button>
            <Button variant="contained" onClick={() => setSPI('4')}>4</Button>
            <Button variant="contained" onClick={() => setSPI('5')}>5</Button>
            <Button variant="contained" onClick={() => setSPI('6')}>6</Button>
            <Button variant="contained" onClick={() => setSPI('7')}>7</Button>
            <Button variant="contained" onClick={() => setSPI('DNE')}>Doesn't Say</Button>
            {/* <form>
              Please Enter the SPI Number.
            <label>
                  <input type = "text" value = "SPI"/>
            </label>
              <Button variant="contained"> Done</Button>
            </form> */}
          </div>
        )
        // if (SPI === ('1' || '2')) {
        //     setResult('r');
        // } else {
        //     setResult('w');
        // }
      }
      else if (materialType === 'paper') {
        content = (
          <div>
            Is there a wax or plastic coating?
            <Button variant="contained" onClick={() => setResult('w')}>Yes</Button>
            <Button variant="contained" onClick={() => setResult('r')}>No</Button>
          </div>
        )
      }
    }

    // This if statement is not working rn
    if (result === ('r' || 'w')) {
      console.log(result);
      <div>
        Your {detectedObject} is {result}.
      </div>
    }

  return (
    <div>
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
