import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Card, CardHeader, UncontrolledTooltip } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { MdOutlineModeEdit, MdDeleteOutline } from 'react-icons/md';
import { GrUpdate } from 'react-icons/gr';
import { useContextHook } from 'use-context-hook';
import { RefetchContext } from '../contexts/refetchContext';
import withAuthProtection from '../components/Common/withAuthProtection';
import { qnaColumns } from '../common/columns';
import TableContainer from '../components/Common/TableContainer';
import BreadCrumb from '../components/Common/BreadCrumb';
import questionThunk from '../slices/qnas/thunk';
import Button from '../components/Atoms/Button';
import AdminModal from '../components/Organisms/AdminModal';
import UpdatePasswordModal from '../components/Organisms/UpdatePassword';
import DeleteModal from '../components/Molecules/DeleteModal';

const Admins = () => {
  const dispatch = useDispatch();
  const { fetch, refetch } = useContextHook(RefetchContext, v => ({
    fetch: v.fetch,
    refetch: v.refetch,
  }));
  const questions = useSelector(state => state?.Question?.questions || {});
  const isLoading = useSelector(state => state?.Question?.isLoading);

  const [adminModal, setAdminModal] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
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
    dispatch(questionThunk.getAllQuestions(filters));
  }, [filters, fetch]);

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
        <div className="update-password">
          <GrUpdate
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setAdmin(_?._id);
              setUpdatePasswordModal(true);
            }}
            color="blue"
            size={15}
            id="update-password"
          />
          <UncontrolledTooltip placement="top" target="update-password">
            Update Password
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
  const { question_rows, totalCount } = useMemo(
    () => ({
      question_rows: questions?.items?.map(_ => [
        format(new Date(_?.createdAt), 'yyyy-MM-dd') || '------------',
        _?.question || '------------',
        _?.answer || '------------',
        _?.keywords?.length > 0 ? _.keywords.map(__ => __).join(', ') : '------------',
        actionBtns(_),
      ]),
      totalCount: questions?.totalItems,
    }),
    [questions?.items],
  );

  return (
    <>
      <Head>
        <title>AIVA | QnA&apos;s</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="QnA's" />
          <Row>
            <Col lg={12}>
              <Card id="qnaList">
                <CardHeader>
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0 fw-semibold">QnA List</h5>
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
                          <i className="ri-add-line align-bottom me-1" /> Create Question
                        </Button>{' '}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={qnaColumns}
                      data={question_rows || []}
                      isGlobalFilter
                      isLoading={isLoading}
                      isAdminFilter
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
