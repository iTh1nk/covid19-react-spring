import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
  Collapse,
  Table
} from "reactstrap";

export default function Covid19() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);

  const containerStyle = {
    marginTop: "1em",
    marginBottom: "1em"
  };

  const regionTitle = {
    color: "darkblue"
  };

  const numConfirmed = {
    color: "darkred"
  };
  const numNew = {
    color: "red"
  };
  const numDead = {
    color: "grey"
  };

  return (
    <>
      <Container style={containerStyle}>
        {/* Card for Irvine */}
        <Card>
          <CardHeader>
            <h5 style={regionTitle}>尔湾疫情</h5>
          </CardHeader>
          <CardBody>
            <Table light>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>累计确诊</th>
                  <th style={numNew}>今日新增</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>65</td>
                  <td style={numNew}>+8</td>
                </tr>
              </tbody>
            </Table>
            <Button
              color="secondary"
              onClick={toggle}
              size="sm"
              style={{ marginBottom: "1rem" }}
            >
              更多...
            </Button>

            {/* Toggle Content for Irvine */}
            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>麦速更新中......</CardBody>
              </Card>
            </Collapse>
          </CardBody>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <hr />
        {/* Card for OC */}
        <Card>
          <CardHeader>
            <h5 style={regionTitle}>橙县疫情</h5>
          </CardHeader>
          <CardBody>
            <Table light>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>累计确诊</th>
                  <th style={numNew}>今日新增</th>
                  <th style={numDead}>累计死亡</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>656</td>
                  <td style={numNew}>+56</td>
                  <td style={numDead}>13</td>
                </tr>
              </tbody>
            </Table>
            <Button
              color="secondary"
              onClick={toggle1}
              size="sm"
              style={{ marginBottom: "1rem" }}
            >
              更多...
            </Button>

            {/* Toggle Content for OC */}
            <Collapse isOpen={isOpen1}>
              <Card>
                <CardBody>麦速更新中......</CardBody>
              </Card>
            </Collapse>
          </CardBody>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <hr />
        {/* Card for US */}
        <Card>
          <CardHeader>
            <h5 style={regionTitle}>全美疫情</h5>
          </CardHeader>
          <CardBody>
            <Table light>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>累计确诊</th>
                  <th style={numNew}>今日新增</th>
                  <th style={numDead}>累计死亡</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>240,000+</td>
                  <td style={numNew}>+27,000</td>
                  <td style={numDead}>6,000+</td>
                </tr>
              </tbody>
            </Table>
            <Button
              color="secondary"
              onClick={toggle2}
              size="sm"
              style={{ marginBottom: "1rem" }}
            >
              更多...
            </Button>

            {/* Toggle Content for US */}
            <Collapse isOpen={isOpen2}>
              <Card>
                <CardBody>麦速更新中......</CardBody>
              </Card>
            </Collapse>
          </CardBody>
          {/* <CardFooter></CardFooter> */}
        </Card>
      </Container>
    </>
  );
}
