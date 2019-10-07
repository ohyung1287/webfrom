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
import Web3 from "web3";
import axios from "axios";
import "./App.css";
import FormPage from "./component/FormPage.js";
export default class TabView extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      api: "http://localhost:8080",
      activeTab: "1",
      wallet: null
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
      window.ethereum
        .enable()
        .then(res => this.setState({ wallet: res[0] }))
        .catch(err => null);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
  }
  render() {
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
                        address: this.state.wallet,
                        name: "TEST NAME"
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
          <TabPane tabId="3">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
