import React from 'react';
import { CardBody, Row } from 'reactstrap';
import { PermissionGlobalFilter } from './Filters';

const GlobalFilter = ({ setFilters, isPermissionFilter }) => (
  <>
    <CardBody className="border border-dashed border-end-0 border-start-0">
      <form>
        <Row className="g-3">{isPermissionFilter && <PermissionGlobalFilter setFilters={setFilters} />}</Row>
      </form>
    </CardBody>
  </>
);

export default GlobalFilter;
