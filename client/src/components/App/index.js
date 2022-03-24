import { Routes, Route } from "react-router-dom";
import { Row, Col } from "antd";

import Home from "../../pages/Home";
import Event from "../../pages/Event";
function App() {
  return (
    <div className="App">
      <Row justify="center">
        <Col span={14}>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<Event />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
