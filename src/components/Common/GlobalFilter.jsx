import React from 'react';
import { CardBody, Row } from 'reactstrap';
import { PermissionGlobalFilter, RoleGlobalFilter } from './Filters';

const GlobalFilter = ({ isPermissionFilter, isRoleFilter, setFilters }) => (
  <CardBody className="border border-dashed border-end-0 border-start-0">
    <form>
      <Row className="g-3">
        {isPermissionFilter && <PermissionGlobalFilter setFilters={setFilters} />}
        {isRoleFilter && <RoleGlobalFilter setFilters={setFilters} />}
      </Row>
    </form>
  </CardBody>
);

export default GlobalFilter;
