import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchCustomerInternalStats } from "../../Redux/Actions/StatisticActions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartGraph = ({ data, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Main>
      <Title>Hours spended on tasks</Title>
      <BarChart
        width={600}
        height={350}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={15}
        strokeOpacity={0.7}
      >
        <CartesianGrid
          strokeLinecap="3 3"
          strokeOpacity={0.5}
          vertical={false}
        />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="customerTime"
          fill="#FF2366"
          background={{ fill: "#eee" }}
        />
        <Bar dataKey="internalTime" fill="#4791FF" />
      </BarChart>
    </Main>
  );
};

const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 20px;
  letter-spacing: 0.02em;
  color: #585656;
`;

const Main = styled.div`
  text-align: center;
  height: 430px;
  border-radius: 10px;
  margin-left: 15px;
  background: #fafafa;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.16));
`;

const mapStateToProps = (state) => {
  return {
    data: state.statisticData.hoursOnCustomersInternal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchCustomerInternalStats())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarChartGraph);
