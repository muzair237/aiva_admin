import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import { RxCrossCircled } from 'react-icons/rx';
import { format } from 'date-fns';
import dashboardThunk from '../slices/dashboard/thunk';
import BreadCrumb from '../components/Common/BreadCrumb';
import withAuthProtection from '../components/Common/withAuthProtection';
import Button from '../components/Atoms/Button';
import { greetings } from '../helpers/common';
import DashCards from '../components/Organisms/DashCards';
import GaugeChart from '../components/Organisms/GuageChart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state?.Auth?.user);
  //   const isLoading = useSelector(state => state?.Dashboard?.isLoading);
  const dashboardCards = useSelector(state => state?.Dashboard?.dashboardCards);
  console.log(dashboardCards);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });
  const flatpickrRef = useRef(null);

  const onChangeDateFilter = filter => {
    const [startDate, endDate] = filter;
    if (startDate && endDate) {
      setFilters(prev => ({
        ...prev,
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      }));
    }
  };

  useEffect(() => {
    dispatch(dashboardThunk.getDashboardCards(filters));
  }, [filters]);

  return (
    <>
      <Head>
        <title>AIVA | DASHBOARD</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" />
          <Row className="mb-3 pb-1">
            <Col xs={12}>
              <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                <div className="flex-grow-1">
                  <h4 className="fs-16 mb-1">
                    {greetings()}, {name}!
                  </h4>
                  <p className="text-muted mb-0">
                    Here&apos;s what&apos;s happening with your Virtual Assistant today.
                  </p>
                </div>
                <div className="mt-3 mt-lg-0">
                  <Row className="g-3 mb-0 align-items-center">
                    <div className="col-sm-auto">
                      <div className="input-group">
                        <Flatpickr
                          className="form-control border-0 dash-filter-picker shadow"
                          ref={flatpickrRef}
                          options={{
                            mode: 'range',
                            dateFormat: 'Y-m-d',
                            onChange: onChangeDateFilter,
                          }}
                          placeholder="Select Date"
                        />
                        <div className="input-group-text bg-primary border-primary text-white">
                          <i className="ri-calendar-2-line" />
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <Button
                        onClick={() => {
                          if (flatpickrRef.current) {
                            flatpickrRef.current.flatpickr.clear();
                            setFilters({
                              startDate: '',
                              endDate: '',
                            });
                          }
                        }}
                        className="btn"
                        disabled={!(flatpickrRef.current && flatpickrRef.current.flatpickr.selectedDates.length > 0)}
                        color="danger">
                        Clear Filter <RxCrossCircled size={20} />
                      </Button>
                    </div>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <DashCards dashboardCards={dashboardCards} />
            <GaugeChart />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withAuthProtection(Dashboard);
