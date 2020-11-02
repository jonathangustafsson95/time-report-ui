import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const barStyle = {
  fontFamily: "roboto",
};

const Statistic = ({ data }) => {
  return (
    <Main>
      <Title>Hours spended on tasks</Title>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barSize={15}
          strokeOpacity={0.7}
          style={barStyle}
        >
          <CartesianGrid
            strokeLinecap="3 3"
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis dataKey="taskName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="actualHours"
            fill="#FF2366"
            background={{ fill: "#eee" }}
          />
          <Bar dataKey="estimatedHours" fill="#4791FF" />
        </BarChart>
      </ResponsiveContainer>
    </Main>
  );
};

const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  margin-left: 56px;
  margin-bottom: 20px;
  letter-spacing: 0.02em;
  color: #585656;
`;

const Main = styled.div`
  border-radius: 10px;
  margin-left: 15px;
  background: #fafafa;
  padding-top: 10px;
  padding-bottom: 10px;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.16));
`;

const mapStateToProps = (state) => {
  return {
    data: state.statisticData.taskStats,
  };
};

export default connect(mapStateToProps)(Statistic);
