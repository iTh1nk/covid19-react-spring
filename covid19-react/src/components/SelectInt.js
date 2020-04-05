import React, { useState, useEffect, useContext, useReducer } from "react";

import Select from "react-select";
import { Collapse, Button, CardBody, Card, Table } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
import moment from "moment";
import { AssignContext } from "./AssignContext";

function SelectInt(props) {
  // const dateMoment = () => {
  //   return moment({ startDate })
  //     .subtract(1, "day")
  //     .format("YYYY-M-D");
  // };

  useEffect(() => {
    setCollapse(props.toggle);
  }, [props.toggle]);

  const [selectedOptionCountry, setSelectedOptionCountry] = useState([]);
  const handleChangeCountry = selectedOptionCountry => {
    setSelectedOptionCountry(selectedOptionCountry);
    console.log(`Option selected:`, selectedOptionCountry);
  };

  const [startDate, setStartDate] = useState(new Date());

  const [collapse, setCollapse] = useState(false);
  const { toggleStatus, setToggleStatus } = useContext(AssignContext);

  const [selectedData, dispatch] = useReducer(
    selectedDataReducer,
    "Waiting for data..."
  );
  function selectedDataReducer(state, action) {
    switch (action.type) {
      case "US":
        return;
    }
  }

  const onEntering = () => setToggleStatus("...");
  const onEntered = () => setToggleStatus("关闭");
  const onExiting = () => setToggleStatus("...");
  const onExited = () => setToggleStatus("展开");
  // const toggle = () => setCollapse(!collapse);

  const ShowSelectData = () => {
    if (selectedOptionCountry == "") {
      return (<div style={{color: "red"}}>请选择国家...</div>);
    } else if (moment(new Date()).diff(startDate) < 0) {
      return <div style={{ color: "red" }}>当前日期无数据</div>;
    }
    return (
      <div>
        {props.data.US.map((item, index) => (
          <div key={index}>
            {item.date ==
            moment(startDate)
              // .subtract(1, "day")
              .format("YYYY-M-D") ? (
              <Table>
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th>日期</th>
                    <th style={{ color: "darkred" }}>累计确诊</th>
                    <th style={{ color: "grey" }}>累计死亡</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <td>{item.date}</td>
                    <td style={{ color: "darkred" }}>{item.confirmed}</td>
                    <td style={{ color: "grey" }}>{item.deaths}</td>
                  </tr>
                </tbody>
              </Table>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  const handleReset = (e) => {
    e.preventDefault();
    setStartDate(new Date());
    setSelectedOptionCountry([]);
  };

  const options = [
    { value: "China", label: "中国(China)" },
    { value: "US", label: "美国(US)" },
    { value: "Italy", label: "意大利(Italy)" }
  ];

  return (
    <div>
      {/* <Moment format="YYYY-M-D">{startDate}</Moment> */}
      <Collapse
        isOpen={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <Card>
          <CardBody>
            <Select
              value={selectedOptionCountry}
              onChange={handleChangeCountry}
              options={options}
              placeholder="请下拉选择或手动输入国家名..."
            />
            <br />
            <span>疫情日期: </span>
            <DatePicker
              selected={startDate}
              onChange={date => {
                setStartDate(date);
              }}
              dateFormat="yyyy-M-d"
              showYearDropdown
              // openToDate={new Date("2020/01/22")}
            />
            {selectedOptionCountry == "" ? null : (
              <div style={{ marginTop: "1em" }}>
                <Button
                  color="secondary"
                  size="sm"
                  outline
                  onClick={e => handleReset(e)}
                >
                  重置
                </Button>
              </div>
            )}
            {selectedOptionCountry == "" ? null : (
              <div style={{ marginTop: "1em", color: "green" }}>
                已选择国家:{" "}
                <span style={{ color: "green" }}>
                  {selectedOptionCountry.label}
                </span>
              </div>
            )}
            {/* {moment(startDate).format("YYYY-M-D") ==
            moment(new Date()).format("YYYY-M-D") ? null : ( */}
            <div style={{ marginTop: "1em" }}>
              <ShowSelectData />
            </div>
            {/* )} */}
          </CardBody>
        </Card>
        <br />
      </Collapse>
    </div>
  );
}

export default SelectInt;
