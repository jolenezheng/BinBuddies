import React, { useState } from "react";
import {Button} from '@material-ui/core/';
import {Link} from "react-router-dom";

function ImageRecognition(props) {
  // let {image} = props.history.location.state; // image can be accessed here
  let [selectedImage, setSelectedImage] = useState();
  let [result, setResult] = useState(); // save result here after fetch
  let [init, setInit] = useState(false);

  let fetchResult = () => {
    fetch('http://localhost:9000/photo', {
      method: 'GET',
    })
    .then(res => res.json())
    .then((json) => {
      console.log("Setting JSON: " + JSON.stringify(json, null, 2));
      console.log("OBJECT: " + json['obj']);
      setResult(json['obj']);
      setInit(true);
    })
    .catch((e) => console.log(e));
  }

  if (!init) {
    fetchResult();
  } else {
    console.log("INITIALIZED");
    if (result) {
      return (
        <div className="recognizedScreen">
          {/* Your photo has been recognized. Your item: {result} */}
          <div className="resultingItem">
            {result}
          </div>
          <Link className="proceedButton"
              to={{
                  pathname: "/fetching",
                }}
          >
          </Link>
          <Link className="tryAgainButton"
              to={{ pathname: "/home" }}
          >

          </Link>
        </div>
      )
    } else {
      console.log("NO RESULT")
    }
  }
  return(
    <div className="loadingScreen">
      Loading...
    </div>
  )
}

export default ImageRecognition;
