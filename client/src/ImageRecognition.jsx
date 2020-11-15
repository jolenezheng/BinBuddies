import React, { useState } from "react";
import {Button} from '@material-ui/core/';
import {Link} from "react-router-dom";

function ImageRecognition(props) {
  let {image} = props.history.location.state; // image can be accessed here
  let [selectedImage, setSelectedImage] = useState(image);
  let [result, setResult] = useState(); // save result here after fetch
  let [init, setInit] = useState(false);

  let fetchResult = () => {
    //fetch google result here
    setResult("box");
    setInit(true);
  }
  if (!init) {
    // fetchResult();
    // fetch(URL, {
    //   method: 'GET',
    // })
    // .then(res => res.json())
    // .then((json) => {
    //   setResult(json);
    //   setInit(true);
    // })
    // .catch((e) => console.log(e));
  }


  if (result) {
    return (
      <div>
        Your photo has been recognized. Your item: {result}
        <Link 
            to={{
                pathname: "/fetching",
              }}
        >
          <Button>
            Yes, Proceed
          </Button>
        </Link>
        
        <Button>
          No, let's try again
        </Button>
      </div>
    )
  }

  return(
    <div>
      Loading...
    </div>
  )
}

export default ImageRecognition;
