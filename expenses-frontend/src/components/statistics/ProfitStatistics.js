import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import api from "../../http/axios";
import TextField from "@material-ui/core/TextField";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ProfitStatistics() {
  const [profitArr, setProfitArr] = useState([]);
  const [dateFrom, setDateFrom] = useState("01-01-2020");
  const [dateTo, setDateTo] = useState(new Date());

  useEffect(() => {
    api
      .get(`/statistics/profit?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setProfitArr(res.data.profitStatistics);
      });
  }, [dateFrom, dateTo]);

  return (
    <div className="mt-5">
      <h1 className="text-center mt-5 mb-3">Profit Graph</h1>
      <Container>
        <Row>
          <Col sm={3} />
          <Col sm={3}>
            <TextField
              id="date"
              label="From"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setDateFrom(e.target.value);
              }}
            />
          </Col>
          <Col sm={3}>
            <TextField
              id="date"
              label="To"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setDateTo(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Container>

      <div style={{ width: "95%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={profitArr} className="m-5 expenses-statistics">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProfitStatistics;