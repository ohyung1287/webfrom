import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle, 
  CardText,
  Row,
  Col
} from "reactstrap";
import abi from "./abi";
import Web3 from "web3";
import axios from "axios";
import "./App.css";
import FormPage from "./component/FormPage.js";
import { element } from "prop-types";
export default class TabView extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      api: "http://localhost:8080",
      activeTab: "1",
      wallet: null,
      onStoreList: null,
      tokenList: null,
      web3: null,
      DRM:null
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentDidMount() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      this.setState({web3:window.web3});

      window.ethereum
        .enable()
        .then(res => {
          this.setState({ wallet: res[0] });
          axios
            .post(`${this.state.api}/getOwnerTokens/`, { address: res[0] })
            .then(res => {
              // console.log(res.data);
              this.setState({ tokenList: res.data });
            })
            .catch(err => console.log(err));
        })
        .catch(err => null);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    axios
      .get(`${this.state.api}/getOnStoreTokens/`)
      .then(res => {
        // console.log(res.data);
        this.setState({ onStoreList: res.data });
      })
      .catch(err => console.log(err));
    // alert(this.state.wallet);
  }

  render() {
    let item = [];
    let storeList = this.state.onStoreList;
    let DRM;
    let wallet;
    let web3;
    let assetID;
    if(this.state.web3!=null){
      console.log(this.state.web3);
      DRM = new this.state.web3.eth.Contract(abi,"0x25b099439d0282fa4daec224aef9ffe6fc3b9b61");
      wallet = this.state.wallet;
      web3 = this.state.web3;
    }

    function tab3() {
      if (storeList != null)
        for (var i = 0; i < storeList.length; i++) {
          item.push(
            <Row>
              <Col>
                <Card body>
                  <CardTitle>{storeList[i].name}</CardTitle>
                  <CardText>
                    <div>artist:{storeList[i].artist}</div>
                    <div>descrption:{storeList[i].description}</div>
                    <div>realart:{storeList[i].realart}</div>
                    <div>thumnail:{storeList[i].thumnail}</div>
                    <div>timestamp:{storeList[i].timestamp}</div>
                    <div>id:{storeList[i].id}</div>
                  </CardText>
                  <Button value={storeList[i].id} onClick={(e)=>{
                    console.log(e.target.value);
                    DRM.methods.requestBuy(0).send({
                      from: wallet,
                      gas: '480000',
                      value:'50',
                      gasPrice: web3.utils.toWei('20', 'gwei')
                    });
                  }}>Buy</Button>
                </Card>
              </Col>
            </Row>
          );
        }
    }
    tab3();
    let item2 = [];
    let tokenList = this.state.tokenList;

    function tab4() {
      if (tokenList != null)
        for (var i = 0; i < tokenList.length; i++) {
          item2.push(
            <Row>
              <Col>
                <Card body>
                  <CardTitle>{tokenList[i].name}</CardTitle>
                  <CardText>
                    <div>artist:{tokenList[i].artist}</div>
                    <div>descrption:{tokenList[i].description}</div>
                    <div>realart:{tokenList[i].realart}</div>
                    <div>thumnail:{tokenList[i].thumnail}</div>
                    <div>timestamp:{tokenList[i].timestamp}</div>
                    <div>id:{tokenList[i].id}</div>
                  </CardText>
                </Card>
              </Col>
            </Row>
          );
        }
    }
    tab4();        

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              // className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Registration
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              // className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Upload Artwork
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              // className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Store
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              // className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Inventory
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Button
                  onClick={() => {
                    axios
                      .post(`${this.state.api}/artistRegister/`, {
                        address: this.state.wallet
                      })
                      .then(res => res.json())
                      .catch(err => console.log(err));

                    // alert(this.state.wallet);
                  }}
                >
                  Register
                </Button>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <FormPage></FormPage>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">{item}</TabPane>
          <TabPane tabId="4">{item2}</TabPane>
        </TabContent>
      </div>
    );
  }
}
