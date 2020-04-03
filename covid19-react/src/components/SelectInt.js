import React, { useState } from "react";

// import Select from "react-select";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const options = [
  { value: "china", label: "China" },
  { value: "us", label: "US" },
  { value: "italy", label: "Italy" }
];

function SelectInt(props) {
  const [selectedOptionCountry, setSelectedOptionCountry] = useState([]);
  const handleChangeCountry = selectedOptionCountry => {
    setSelectedOptionCountry(selectedOptionCountry);
    console.log(`Option selected:`, selectedOptionCountry);
  };

  const [startDate, setStartDate] = useState(new Date());
  const handleChangeDatePicker = date => {
    setStartDate(date);
  };

  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState("Closed");

  const onEntering = () => setStatus("Opening...");
  const onEntered = () => setStatus("Opened");
  const onExiting = () => setStatus("Closing...");
  const onExited = () => setStatus("Closed");
  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        点击进入麦搜索(该功能麦速更新中...)
      </Button>
      {/* <h5>Current state: {status}</h5> */}
      <Collapse
        isOpen={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <Card>
          <CardBody>
            {/* <Select
              value={selectedOptionCountry}
              onChange={handleChangeCountry}
              options={options}
              placeholder="请下拉选择或手动输入英文国家名..."
            /> */}
            <br />
            <span>疫情日期: </span>
            <DatePicker
              selected={startDate}
              onChange={handleChangeDatePicker}
            />
            <br /><br />
            {/* 已选国家: {[selectedOptionCountry][0].label} */}
            {[props][0].data.US[0].confirmed}
          </CardBody>
        </Card>
        <br />
      </Collapse>
    </div>
  );
}

export default SelectInt;
