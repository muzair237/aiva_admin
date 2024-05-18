import React from 'react';
import { Card, CardHeader, Col } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';

const PieChart = () => {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        // The style of the legend text
        color: '#858d98',
      },
    },
    // color: chartPieColors,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          {
            value: 1048,
            name: 'Search Engine',
          },
          {
            value: 735,
            name: 'Direct',
          },
          {
            value: 580,
            name: 'Email',
          },
          {
            value: 484,
            name: 'Union Ads',
          },
          {
            value: 300,
            name: 'Video Ads',
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    textStyle: {
      fontFamily: 'Poppins, sans-serif',
    },
  };

  return (
    <Col xl={6}>
      <Card>
        <CardHeader>
          <h4 className="card-title mb-0">Users by Age Groups</h4>
        </CardHeader>
        <div className="card-body">
          <ReactEcharts style={{ height: '350px' }} option={option} />
        </div>
      </Card>
    </Col>
  );
};

export default PieChart;
