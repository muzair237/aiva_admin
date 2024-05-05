import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Col, Container, Row, Card, CardHeader, UncontrolledTooltip } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Link from 'next/link';
import withAuthProtection from '../components/Common/withAuthProtection';
import { permissionColumns } from '../common/columns';
import TableContainer from '../components/Common/TableContainer';
import BreadCrumb from '../components/Common/BreadCrumb';
import permissionThunk from '../slices/permissions/thunk';
import Button from '../components/Atoms/Button';
import PermissionModal from '../components/Organisms/PermissionModal';

const Permissions = () => {
  const dispatch = useDispatch();
  const permissions = useSelector(state => state.Permission.permissions || {});
  const isLoading = useSelector(state => state.Permission.isLoading || false);

  const [permissionModal, setPermissionModal] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    itemsPerPage: 10,
    getAll: false,
    searchText: '',
    sort: 'latest',
    type: '',
  });

  const setSearchQueryCallback = useCallback(newSearchQuery => {
    setFilters(newSearchQuery);
  }, []);

  useEffect(() => {
    // if (!permissions?.length > 0)
    dispatch(permissionThunk.getAllPermissions(filters));
  }, [filters]);

  const actionBtns = () => (
    <>
      <div className="d-flex gap-3">
        <div className="edit">
          <Link className="text-primary d-inline-block edit-item-btn" id="edit" href="#">
            <i className="ri-pencil-fill fs-16" />
          </Link>
          <UncontrolledTooltip placement="top" target="edit">
            Edit
          </UncontrolledTooltip>
        </div>
        <div className="remove">
          <Link type="button" className="text-danger d-inline-block remove-item-btn" id="delete" href="#">
            <i className="ri-delete-bin-5-fill fs-16" />
          </Link>
          <UncontrolledTooltip placement="top" target="delete">
            Delete
          </UncontrolledTooltip>
        </div>
      </div>
    </>
  );
  const { permission_rows, totalCount } = useMemo(
    () => ({
      permission_rows: permissions?.items?.map(_ => [
        format(new Date(_?.createdAt), 'yyyy-MM-dd') || '------------',
        _?.can || '------------',
        _?.description || '------------',
        _?.for || '------------',
        actionBtns(_),
      ]),
      totalCount: permissions?.totalItems,
    }),
    [permissions],
  );

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Permissions" />
          <Row>
            <Col lg={12}>
              <Card id="permissionList">
                <CardHeader>
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0 fw-semibold">Permission List</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <Button
                          onClick={() => setPermissionModal(true)}
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn">
                          <i className="ri-add-line align-bottom me-1" /> Add Permission
                        </Button>{' '}
                        {/* <button type="button" className="btn btn-primary" onClick={() => setIsExportCSV(true)}>
                          <i className="ri-file-download-line align-bottom me-1" /> Export
                        </button> */}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={permissionColumns}
                      data={permission_rows || []}
                      isGlobalFilter
                      isLoading={isLoading}
                      isPermissionFilter
                      currentPage={filters?.page}
                      totalCount={totalCount}
                      itemsPerPage={filters?.itemsPerPage}
                      setFilters={setSearchQueryCallback}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {permissionModal && <PermissionModal isOpen={permissionModal} setIsOpen={setPermissionModal} />}
    </>
  );
};

export default withAuthProtection(Permissions);
