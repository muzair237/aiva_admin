import React from 'react';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';

const RecentQueries = () => (
  <>
    <Col xl={12}>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Recent Queries</h4>
        </CardHeader>

        <CardBody>
          <div className="table-responsive table-card">
            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
              <thead className="text-muted table-light">
                <tr>
                  <th scope="col">Created At</th>
                  <th scope="col">Query</th>
                  <th scope="col">Asked By</th>
                </tr>
              </thead>
              <tbody>
                {/* {(recentOrders || []).map((item, key) => ( */}
                <tr
                //  key={key}
                >
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-2">
                        {/* <img src={item.img} alt="" className="avatar-xs rounded-circle" /> */}
                      </div>
                      <div className="flex-grow-1">2024-23-23</div>
                    </div>
                  </td>
                  <td>Hello! How are you?</td>
                  <td>Muhammad Uzair</td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Col>
  </>
);

export default RecentQueries;
