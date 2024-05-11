import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Col, Container, Row, Card, CardHeader, UncontrolledTooltip } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { MdOutlineModeEdit, MdDeleteOutline } from 'react-icons/md';
import { useContextHook } from 'use-context-hook';
import { RefetchContext } from '../contexts/refetchContext';
import withAuthProtection from '../components/Common/withAuthProtection';
import { adminColumns } from '../common/columns';
import TableContainer from '../components/Common/TableContainer';
import BreadCrumb from '../components/Common/BreadCrumb';
import adminThunk from '../slices/admins/thunk';
import Button from '../components/Atoms/Button';
import AdminModal from '../components/Organisms/AdminModal';
import DeleteModal from '../components/Molecules/DeleteModal';

const Admins = () => {
  const dispatch = useDispatch();
  const { fetch, refetch } = useContextHook(RefetchContext, v => ({
    fetch: v.fetch,
    refetch: v.refetch,
  }));
  const admins = useSelector(state => state?.Admin?.admins || {});
  const uniqueRoles = useSelector(state => state?.Admin?.roles || []);
  const isLoading = useSelector(state => state?.Admin?.isLoading);

  const [adminModal, setAdminModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [admin, setAdmin] = useState();
  const [adminToDelete, setAdminToDelete] = useState();
  const [filters, setFilters] = useState({
    page: 1,
    itemsPerPage: 10,
    getAll: false,
    startDate: '',
    endDate: '',
    searchText: '',
    sort: 'latest',
    type: '',
  });

  const setSearchQueryCallback = useCallback(newSearchQuery => {
    setFilters(newSearchQuery);
  }, []);

  const deleteAdmin = () => {
    dispatch(adminThunk.deleteAdmin({ adminToDelete, setDeleteModal, refetch }));
  };

  useEffect(() => {
    dispatch(adminThunk.getAllAdmins(filters));
  }, [filters, fetch]);

  useEffect(() => {
    dispatch(adminThunk.getUniqueRoles());
  }, []);

  const actionBtns = _ => (
    <>
      <div className="d-flex gap-3">
        <div className="edit">
          <MdOutlineModeEdit
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setAdmin(_);
              setAdminModal(true);
            }}
            color="green"
            size={19}
            id="edit"
          />
          <UncontrolledTooltip placement="top" target="edit">
            Edit
          </UncontrolledTooltip>
        </div>
        <div className="remove">
          <MdDeleteOutline
            style={{ cursor: 'pointer' }}
            id="delete"
            size={19}
            color="red"
            onClick={() => {
              setAdminToDelete(_?._id);
              setDeleteModal(true);
            }}
          />
          <UncontrolledTooltip placement="top" target="delete">
            Delete
          </UncontrolledTooltip>
        </div>
      </div>
    </>
  );
  const { admin_rows, totalCount } = useMemo(
    () => ({
      admin_rows: admins?.items?.map(_ => [
        format(new Date(_?.createdAt), 'yyyy-MM-dd') || '------------',
        _?.name || '------------',
        _?.email || '------------',
        _?.roles?.length > 0 ? _.roles.map(__ => __.type).join(', ') : '------------',
        actionBtns(_),
      ]),
      totalCount: admins?.totalItems,
    }),
    [admins?.items],
  );

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Admins" />
          <Row>
            <Col lg={12}>
              <Card id="roleList">
                <CardHeader>
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0 fw-semibold">Admin List</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <Button
                          onClick={() => {
                            setAdmin();
                            setAdminModal(true);
                          }}
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn">
                          <i className="ri-add-line align-bottom me-1" /> Create Admin
                        </Button>{' '}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={adminColumns}
                      data={admin_rows || []}
                      isGlobalFilter
                      isLoading={isLoading}
                      isAdminFilter
                      currentPage={filters?.page}
                      totalCount={totalCount}
                      itemsPerPage={filters?.itemsPerPage}
                      uniqueRoles={uniqueRoles}
                      setFilters={setSearchQueryCallback}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {adminModal && (
        <AdminModal admin={admin} uniqueRoles={uniqueRoles} isOpen={adminModal} setIsOpen={setAdminModal} />
      )}
      {deleteModal && (
        <DeleteModal
          isOpen={deleteModal}
          setIsOpen={setDeleteModal}
          handleClick={deleteAdmin}
          message="Are you sure you Want to Delete this Admin?"
        />
      )}
    </>
  );
};

export default withAuthProtection(Admins);
