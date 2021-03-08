import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GrLocation } from "react-icons/gr";
import axios from "axios";
import { ReactSVG } from "react-svg";
import indiaSvg from "./static/images/india.svg";
import "./index.scss";

const App = () => {
  const [data, setData] = React.useState([]);
  const [dailyStates, setDailyStates] = React.useState([]);
  const [selectedState, setSelectedState] = React.useState(null);

  let [values, setValues] = React.useState({
    confirmed: null,
    active: null,
    deceased: null,
    recovered: null,
  });

  React.useEffect(() => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get("https://api.covid19india.org/states_daily.json")
      .then((res) => {
        setDailyStates(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (e) => {
    console.log(e);

    const clickedPoint = e.target;
    if (
      clickedPoint.closest("path") &&
      clickedPoint.closest("path").hasAttribute("title") &&
      clickedPoint.closest("path").getAttribute("title")
    ) {
      console.log(clickedPoint.closest("path").getAttribute("title"));
      const state = clickedPoint.closest("path").getAttribute("title");
      setSelectedState(state);

      data["statewise"]?.forEach((obj) => {
        if (obj["state"] === selectedState) {
          setValues({
            confirmed: obj["confirmed"],
            active: obj["active"],
            deceased: obj["deaths"],
            recovered: obj["recovered"],
          });
        }
      });
    } else {
      return;
    }
  };

  return (
    <div className="app">
      <Container fluid>
        <Row>
          {/* table */}
          <Col xs={12} md={6}>
            <div className="header">
              <GrLocation />
              <div className="header-text">
                <h1>India Covid-19 Dashboard</h1>
                <p>
                  Let's all pray to make our Earth Covid-19 free soon, Stay Safe
                  and do TheLocate.
                </p>
              </div>
            </div>

            <div className="body">
              <table class="table table-light table-borderless table-sm">
                <thead>
                  <tr>
                    <th scope="col">STATE/UT</th>
                    <th scope="col" style={{ color: "aquamarine" }}>
                      CONFIRMED
                    </th>
                    <th scope="col" style={{ color: "brown" }}>
                      ACTIVE
                    </th>
                    <th scope="col" style={{ color: "green" }}>
                      RECOVERED
                    </th>
                    <th scope="col" style={{ color: "red" }}>
                      DECEASED
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data["statewise"]?.map((obj, i) => (
                    <tr>
                      <th scope="row" style={{ color: "brown" }}>
                        {obj["state"]}
                      </th>
                      <td>{obj["confirmed"]}</td>
                      <td>{obj["active"]}</td>
                      <td>{obj["recovered"]}</td>
                      <td>{obj["deaths"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/*JSON.stringify(data["statewise"])*/}
            </div>
          </Col>

          {/* map */}
          <Col xs={12} md={6}>
            <div className="header-second">
              <h1>India Map</h1>
              <p>Hover Over States For More Details,</p>
            </div>

            <Card>
              <div className="selectedState">
                <h3>{selectedState}</h3>
              </div>
              <Row noGutters>
                <Col md={3} className="colored-buttons btn1">
                  <span>{"CONFIRMED"}</span>
                  <span>{values.confirmed}</span>
                </Col>
                <Col md={3} className="colored-buttons btn2">
                  <span>{"ACTIVE"}</span>
                  <span>{values.active}</span>
                </Col>
                <Col md={3} className="colored-buttons btn3">
                  <span>{"RECOVERED"}</span>
                  <span>{values.recovered}</span>
                </Col>
                <Col md={3} className="colored-buttons btn4">
                  <span>{"DECEASED"}</span>
                  <span>{values.deceased}</span>
                </Col>
              </Row>

              <ReactSVG src={indiaSvg} onMouseOver={handleClick} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
