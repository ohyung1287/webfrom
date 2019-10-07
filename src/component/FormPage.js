import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3 from "web3";
import abi from "../abi";
export default class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessibility: null,
      DRM_contract: null
    };
    this.onFormsubmit = this.onFormsubmit.bind(this);
    this.accessibilityChange = this.accessibilityChange.bind(this);
  }
  componentDidMount() {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch(err => null);
    var instance = new window.web3.eth.Contract(
      abi,
      "0x71bb75a1f6d291d044bc5cc678c7126f07ee9667"
    );
    this.setState({ DRM_contract: instance });
    console.log(instance);
  }
  accessibilityChange(e) {
    this.setState({ accessibility: e.target.value });
  }
  onFormsubmit(e) {
    e.preventDefault();
    // console.log(this.state.accessibility);
    // console.log(e.target.elements.title.value);
    if (this.state.accessibility) {
      //public
      var price = e.target.elements.price.value;
      var name = e.target.elements.title.value;
      var artist = e.target.elements.artist.value;
      var description = e.target.elements.description.value;
      var realart = e.target.elements.art.value;
      var thumnail = e.target.elements.thumnail.value;
      var deployNum = e.target.elements.number.value;
      // this.state.DRM_contract.methods
      //   .publicCreation(
      //     price,
      //     name,
      //     artist,
      //     description,
      //     realart,
      //     thumnail,
      //     deployNum
      //   )
      //   .send({
      //     gas: 2100000
      //   });
    } else {
    }
  }
  render() {
    return (
      <Form onSubmit={this.onFormsubmit}>
        Do you want this artwork be public or private?
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="accessibility"
                value="true"
                onChange={this.accessibilityChange}
              />{" "}
              Public
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="accessibility"
                value="false"
                onChange={this.accessibilityChange}
              />{" "}
              Private
            </Label>
          </FormGroup>
        </FormGroup>
        Detail of your artwork
        <FormGroup check>
          <Label check>
            Title
            <Input type="text" name="title" />
          </Label>
          <Label check>
            Description
            <Input type="text" name="description" />
          </Label>
          <Label check>
            Artist
            <Input type="text" name="artist" />
          </Label>
          <Label check>
            Thumnail
            <Input type="text" name="thumnail" />
          </Label>
          <Label check>
            Real artwork
            <Input type="text" name="art" />
          </Label>
        </FormGroup>
        How many tokens you want to generate?
        <FormGroup check>
          <Label check>
            Number
            <Input type="number" name="number" />
          </Label>
        </FormGroup>
        What's the price for each token?
        <FormGroup check>
          <Label check>
            Price in ETH
            <Input type="number" name="price" />
          </Label>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
