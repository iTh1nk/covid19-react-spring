import React, { useState, useEffect } from "react";

import Select from "react-select";
import { Collapse, Button, CardBody, Card, Table } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
import moment from "moment";

function SelectInt(props) {
  // const dateMoment = () => {
  //   return moment({ startDate })
  //     .subtract(1, "day")
  //     .format("YYYY-M-D");
  // };

  useEffect(() => {
    setCollapse(props.toggle);
  });

  const [selectedOptionCountry, setSelectedOptionCountry] = useState([]);
  const handleChangeCountry = selectedOptionCountry => {
    setSelectedOptionCountry(selectedOptionCountry);
    console.log(`Option selected:`, selectedOptionCountry);
  };

  const [startDate, setStartDate] = useState(new Date());

  const [selectedData, setSelectedData] = useState("");

  const [collapse, setCollapse] = useState(true);
  const [status, setStatus] = useState("Closed");

  const onEntering = () => setStatus("Opening...");
  const onEntered = () => setStatus("Opened");
  const onExiting = () => setStatus("Closing...");
  const onExited = () => setStatus("Closed");
  // const toggle = () => setCollapse(!collapse);

  const ShowSelectData = () => {
    return (
      <div>
        {props.data.US.map((item, index) => (
          <div key={index}>
            {item.date ==
            moment({ startDate })
              .subtract(1, "day")
              .format("YYYY-M-D") ? (
              <Table>
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th>日期</th>
                    <th>累计确诊</th>
                    <th>累计死亡</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <td>{item.date}</td>
                    <td>{item.confirmed}</td>
                    <td>{item.deaths}</td>
                  </tr>
                </tbody>
              </Table>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  const options = [
    { value: "China", label: "中国(China)" },
    { value: "US", label: "美国(US)" },
    { value: "Italy", label: "意大利(Italy)" }
  ];

  return (
    <div>
      {/* <Button color="primary" style={{ marginBottom: "1rem" }}>
        点击进入麦搜索(该功能麦速更新中...)
      </Button> */}
      {/* <h5>Current state: {status}</h5> */}
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
            />
            <br />
            <br />
            {selectedOptionCountry == ""
              ? "请选择国家..."
              : "已选择国家: " + selectedOptionCountry.label}
            <br />
            <br />
            {selectedOptionCountry == "" ? null : <ShowSelectData />}
            {/* <ShowSelectData /> */}
            <br />
            <br />
            {/* {console.log([props.data])} */}
            {/* {selectedOptionCountry == ""
              ? ""
              : "疫情: " + setSelectedData(props.data.US[0].confirmed)}
            <br />
            <br />
            {selectedData} */}
          </CardBody>
        </Card>
        <br />
      </Collapse>
    </div>
  );
}

export default SelectInt;
