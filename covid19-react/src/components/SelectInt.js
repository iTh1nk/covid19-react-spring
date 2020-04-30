import React, { useState, useEffect, useContext } from "react";

import Select from "react-select";
import { Collapse, Button, CardBody, Card, Table, Spinner } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Moment from "react-moment";
import moment from "moment";
import { AssignContext } from "./AssignContext";
import "./SelectInt.css";
import Axios from "axios";
import IsLoading from "./IsLoading";

function SelectInt(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [topNotification, setTopNotification] = useState([]);

  useEffect(() => {
    Axios.get("/api/toaster").then((resp) => {
      setTopNotification([
        {
          cn: resp.data[1].content,
          en: resp.data[2].content,
        },
      ]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setCollapse(props.toggle);
  }, [props.toggle]);

  const [selectedOptionCountry, setSelectedOptionCountry] = useState([]);
  const handleChangeCountry = (selectedOptionCountry) => {
    setSelectedOptionCountry(selectedOptionCountry);
    console.log(`Option selected:`, selectedOptionCountry);
  };

  const [startDate, setStartDate] = useState(new Date());

  const [collapse, setCollapse] = useState(false);
  const { toggleStatus, setToggleStatus, lanSwitch, lan } = useContext(
    AssignContext
  );

  const onEntering = () => setToggleStatus("...");
  const onEntered = () => setToggleStatus("");
  const onExiting = () => setToggleStatus("...");
  const onExited = () => setToggleStatus("");
  // const toggle = () => setCollapse(!collapse);

  const ShowSelectData = () => {
    console.log(moment(new Date()).diff(startDate, "minutes"));
    if (selectedOptionCountry == "") {
      return (
        <div style={{ color: "red" }}>
          {lan.errors.chooseCountry[lanSwitch]}
        </div>
      );
    } else if (moment(new Date()).diff(startDate, "hours") < 0) {
      return <div style={{ color: "red" }}>{lan.errors.noData[lanSwitch]}</div>;
    } else if (
      moment(new Date()).diff(startDate, "days") == 0 &&
      props.data[selectedOptionCountry.value][0].date !=
        moment(new Date()).format("YYYY-M-D")
    ) {
      return <div style={{ color: "red" }}>{lan.errors.noData[lanSwitch]}</div>;
    } else {
      return (
        <div>
          {props.data[selectedOptionCountry.value].map((item, index) => (
            <div key={index}>
              {item.date == moment(startDate).format("YYYY-M-D") ? (
                <Table>
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <th>{lan.general.date[lanSwitch]}</th>
                      <th style={{ color: "darkred" }}>
                        {lan.general.totalConfirmed[lanSwitch]}
                      </th>
                      <th style={{ color: "grey" }}>
                        {lan.general.totalDeaths[lanSwitch]}
                      </th>
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
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setStartDate(new Date());
    setSelectedOptionCountry([]);
  };

  const options = [
    { value: "China", label: "中国(China)" },
    { value: "US", label: "美国(US)" },
    { value: "Italy", label: "意大利(Italy)" },
    { value: "France", label: "法国(France)" },
    { value: "Spain", label: "西班牙(Spain)" },
    { value: "Germany", label: "法国(Germany)" },
    { value: "United Kingdom", label: "英国(United Kingdom)" },
    { value: "Canada", label: "加拿大(Canada)" },
    { value: "Korea, South", label: "韩国(South Korea)" },
    { value: "Japan", label: "日本(Japan)" },
    { value: "Russia", label: "俄罗斯(Russia)" },
    { value: "Mexico", label: "墨西哥(Mexico)" },
    { value: "Taiwan*", label: "台湾(Taiwan)" },
  ];

  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }

  return (
    <div>
      <p className="topNotification">
        {/* <span>{lan.topNotification[lanSwitch]}</span> */}
        {console.log(topNotification)}
        <span>
          {lanSwitch === "cn"
            ? topNotification[0].en || lan.topNotification[lanSwitch]
            : topNotification[0].en || lan.topNotification[lanSwitch]}
        </span>
      </p>
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
              placeholder={lan.selectInt.placeholder[lanSwitch]}
            />
            <br />
            <span>{lan.general.date[lanSwitch]}: </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              dateFormat="yyyy-M-d"
              showYearDropdown
            />
            {selectedOptionCountry == "" ? null : (
              <div style={{ marginTop: "1em" }}>
                <Button
                  color="secondary"
                  size="sm"
                  onClick={(e) => handleReset(e)}
                >
                  {lan.selectInt.resetBtn[lanSwitch]}
                </Button>
              </div>
            )}
            {selectedOptionCountry == "" ? null : (
              <div style={{ marginTop: "1em", color: "green" }}>
                {lan.errors.chosenCountry[lanSwitch]}{" "}
                <span style={{ color: "green" }}>
                  {selectedOptionCountry.label}
                </span>
              </div>
            )}
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
