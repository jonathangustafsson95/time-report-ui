import React, { useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { connect } from "react-redux";
import { fetchCustomerStats } from "../../Redux/Actions/StatisticActions";

const PieChartGraph = ({ data, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Main>
      <Title>Total time on different customers</Title>
      <ResponsiveContainer width="60%" height={300}>
        <PieChart>
          <Pie
            isAnimationActive={true}
            data={data}
            dataKey="hours"
            nameKey="customerName"
            fill="#FF2366"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Main>
  );
};

const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  color: #585656;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  border-radius: 10px;
  background: #fafafa;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.16));
`;

const mapStateToProps = (state) => {
  return {
    data: state.statisticData.hoursOnCustomers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchCustomerStats()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PieChartGraph);
