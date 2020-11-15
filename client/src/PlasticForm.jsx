// import React, { useState } from "react";
// import {Link} from "react-router-dom";
// import {Button, Modal} from '@material-ui/core/';

// class PlasticForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {value: ''};
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({value: event.target.value});
//     }
  
//     handleSubmit(event) {
//       if (this.state.value == "1" || this.state.value == "2"){
//         alert('A name was submitted: ' + this.state.value);
//         <Link 
//         to={{
//           pathname: "/final",
//           state: { title: {detectedObject}, result: {result}, info: null}
//         }}
//     >
//       <Button>
//         {detectedObject}
//       </Button>
//       </Link>
//       }
//       else{
//         alert('no');
//       }
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Please Enter the SPI Number. 
//             <input type="text" value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <input type="submit" value="Done" />
//         </form>
//       );
//     }
//   }

//   export default PlasticForm;