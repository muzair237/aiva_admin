import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card, CardHeader, Col } from 'reactstrap';
import { format } from 'date-fns';

const GaugeChart = ({ dataColors }) => {
  //   const chartGaugeColors = getChartColorsArray(dataColors);
  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    // color: chartGaugeColors,
    textStyle: {
      fontFamily: 'Poppins, sans-serif',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}',
          color: '#858d98',
        },
        axisLabel: {
          color: '#858d98',
        },
        data: [
          {
            title: {
              color: '#858d98',
            },
            value: 150,
            name: 'SCORE',
          },
        ],
      },
    ],
  };
  return (
    <>
      <Col xl={6}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Total Queries Asked Today - {format(new Date(), 'yyyy-MM-dd')}</h4>
          </CardHeader>
          <div className="card-body">
            <ReactEcharts style={{ height: '350px' }} option={option} />
          </div>
        </Card>
      </Col>
    </>
  );
};

export default GaugeChart;
