import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import Button from '../../Atoms/Button';

export default function Pagination({ setFilters, currentPage, totalCount, itemsPerPage }) {
  return (
    <Row className="justify-content-md-end justify-content-center align-items-center p-2">
      <Col className="col-md-auto">
        <div className="d-flex gap-1">
          <Button
            onClick={() =>
              setFilters(prev => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
            className="btn btn-light btn-outline-dark fw-bold fs-6 previous"
            disabled={currentPage === 1}>
            {'<'}
          </Button>
        </div>
      </Col>
      <Col className="col-md-auto d-none d-md-block">
        Page{' '}
        <strong>
          {currentPage} of {Math.ceil(totalCount / itemsPerPage)}
        </strong>
      </Col>
      <Col className="col-md-auto">
        <Input
          type="number"
          min={1}
          style={{ width: 70 }}
          max={Math.ceil(totalCount / itemsPerPage)}
          defaultValue={currentPage}
          onChange={e => setFilters(prev => ({ ...prev, page: e.target.value }))}
        />
      </Col>
      <Col className="col-md-auto">
        <div className="d-flex gap-1">
          <Button
            onClick={() =>
              setFilters(prev => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
            className="btn btn-light btn-outline-dark fw-bold fs-6 next"
            disabled={
              currentPage === Math.ceil(totalCount / itemsPerPage) || currentPage > Math.ceil(totalCount / itemsPerPage)
            }>
            {'>'}
          </Button>
        </div>
      </Col>
    </Row>
  );
}
