import React, { useState } from "react";
import {Button} from '@material-ui/core/';
import {Link} from "react-router-dom";

function ImageRecognition(props) {
  // let {image} = props.history.location.state; // image can be accessed here
  let [selectedImage, setSelectedImage] = useState();
  let [result, setResult] = useState(); // save result here after fetch
  let [init, setInit] = useState(false);

  let fetchResult = () => {
    //fetch google result here
    

    callBackendAPI()
      .then(res => {
        console.log("got: " + res);
        this.setState({ data: res.data })
      })
      .catch(err => console.log(err));
    
    // console.log("GOT: " + )
  }
  if (!init) {
    fetchResult();
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

async function callBackendAPI() {
  const response = await fetch('/testAPI');
  const body = await response.json();
  if(response.status !== 200) {
    throw Error(body.message)
  }
  return body;
}

export default ImageRecognition;
