import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
  Collapse,
  Table,
  Spinner
} from "reactstrap";
import dataIrvine from "../data/dataIrvine.json";
import dataOC from "../data/dataOC.json";
import Moment from "react-moment";
// import usDate from "https://pomber.github.io/covid19/timeseries.json";
import Axios from "axios";
import SelectInt from "./SelectInt";
import { AssignContext } from "./AssignContext";

export default function Covid19() {
  const [dataUS, setDataUS] = useState([]);
  const [dataWorld, setDataWorld] = useState([]);
  const { toggleSearch, setToggleSearch } = useContext(AssignContext);

  useEffect(() => {
    Axios.get("https://pomber.github.io/covid19/timeseries.json")
      .then(resp => {
        setDataWorld(resp.data);
        setDataUS(resp.data.US.reverse());
        console.log(resp.data.US);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const numNewUS = (arg1, arg2) => {
    return arg1 - arg2;
  };
  const numNewUSList = num => {
    if (num == dataUS.length - 1) {
      return dataUS[parseInt(num)].confirmed;
    } else {
      return (
        dataUS[parseInt(num)].confirmed - dataUS[parseInt(num) + 1].confirmed
      );
    }
  };
  const formatDate = str => {
    return str;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);
  const [isLoading, setIsLoading] = useState(true);

  const date = new Date();

  const Loading = () => {
    return (
      <div>
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="primary" />
      </div>
    );
  };

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
  const dateStyle = {
    fontStyle: "italic",
    color: "darkblue"
  };
  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "8em"
  };

  if (isLoading) {
    return (
      <>
        <div style={loadingStyle}>载入中...</div>
        <div style={loadingStyle}>
          <Loading />
        </div>
      </>
    );
  }

  return (
    <>
      <Container style={containerStyle}>
        <SelectInt data={dataWorld} toggle={toggleSearch} />
        {/* *********************************************************************************** */}
        {/* Card for Irvine */}
        <Card>
          <CardHeader>
            <h5 style={regionTitle}>尔湾疫情 ({dataIrvine[0].date})</h5>
          </CardHeader>
          <CardBody>
            <Table>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>累计确诊</th>
                  <th style={numNew}>今日新增</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>{dataIrvine[0].confirmed}</td>
                  <td style={numNew}>+{dataIrvine[0].new}</td>
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
                <CardBody>
                  <Table borderless>
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th>日期</th>
                        <th style={numConfirmed}>当日累计</th>
                        <th style={numNew}>当日新增</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {dataIrvine.map((item, index) => (
                        <tr key={index}>
                          <td style={dateStyle}>{item.date}</td>
                          <td style={numConfirmed}>{item.confirmed}</td>
                          <td style={numNew}>+{item.new}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Collapse>
          </CardBody>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <br />
        {/* *********************************************************************************** */}
        {/* Card for OC */}
        <Card>
          <CardHeader>
            <h5 style={regionTitle}>橙县疫情({dataOC[0].date})</h5>
          </CardHeader>
          <CardBody>
            <Table>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>累计确诊</th>
                  <th style={numNew}>今日新增</th>
                  <th style={numDead}>累计死亡</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>{dataOC[0].confirmed}</td>
                  <td style={numNew}>+{dataOC[0].new}</td>
                  <td style={numDead}>{dataOC[0].deaths}</td>
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
                <CardBody>
                  <Table borderless>
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th>日期</th>
                        <th style={numConfirmed}>当日累计</th>
                        <th style={numNew}>当日新增</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {dataOC.map((item, index) => (
                        <tr key={index}>
                          <td style={dateStyle}>{item.date}</td>
                          <td style={numConfirmed}>{item.confirmed}</td>
                          <td style={numNew}>+{item.new}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Collapse>
          </CardBody>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <br />
        {/* *********************************************************************************** */}
        {/* Card for US */}
        <Card>
          <CardHeader>
            <h5 style={regionTitle}>
              全美疫情 ({dataUS[0].date})
              {/* (<Moment format="MM-DD">{date}</Moment>) */}
            </h5>
          </CardHeader>
          <CardBody>
            <Table>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>累计确诊</th>
                  <th style={numNew}>今日新增</th>
                  <th style={numDead}>累计死亡</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>{dataUS[0].confirmed}</td>
                  <td style={numNew}>
                    +{numNewUS(dataUS[0].confirmed, dataUS[1].confirmed)}
                  </td>
                  <td style={numDead}>{dataUS[0].deaths}</td>
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
                <CardBody>
                  <Table borderless>
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th>日期</th>
                        <th style={numConfirmed}>当日累计</th>
                        <th style={numNew}>当日新增</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {dataUS.map((item, index) => (
                        <tr key={index}>
                          <td style={dateStyle}>{formatDate(item.date)}</td>
                          <td style={numConfirmed}>{item.confirmed}</td>
                          <td style={numNew}>+{numNewUSList(index)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Collapse>
          </CardBody>
          {/* <CardFooter></CardFooter> */}
        </Card>
      </Container>
    </>
  );
}
