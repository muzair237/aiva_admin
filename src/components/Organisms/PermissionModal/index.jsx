import React, { useEffect, useMemo } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../Atoms/Label';
import Input from '../../Atoms/Input';
import permissionThunk from '../../../slices/permissions/thunk';

export default function PermissionModal({ isOpen, setIsOpen, onCreatePermission }) {
  const dispatch = useDispatch();
  const parents = useSelector(state => state.Permission.parents || []);

  const initialValues = { route: '', can: '', description: '' };

  const validationSchema = Yup.object().shape({
    route: Yup.string()
      .required('Route is required')
      .matches(/^\/[a-zA-Z/_.-]+$/, 'Route can only contain letters, underscores, dots, and must start with a slash.')
      .max(40, "Route's Maximum Character Length Is 40."),
    can: Yup.string()
      .required('Can is required')
      .matches(/^[a-zA-Z._-]+$/, 'Can can only contain letters, underscores, and dashes.')
      .max(40, "Can's Maximum Character Length Is 40."),
    description: Yup.string()
      .required('Description is required')
      .max(40, "Description's Maximum Character Length Is 40."),
    parent: Yup.array().required('Please select at least one parent'),
    group: Yup.object().required('Please Select Group.'),
  });

  const permissionOptions = useMemo(
    () => [
      {
        label: 'No-Parent',
        value: '$',
      },
      ...parents.map(({ can }) => ({
        label: can.split('.nav')[0].charAt(0).toUpperCase() + can.split('.nav')[0].slice(1),
        value: can.split('.nav')[0],
      })),
    ],
    [parents],
  );

  const forOptions = [
    {
      label: 'ADMIN',
      value: 'ADMIN',
    },
    {
      label: 'USER',
      value: 'USER',
    },
  ];

  useEffect(() => {
    // if (!permissions?.length > 0)
    dispatch(permissionThunk.getUniqueParents());
  }, []);

  return (
    <Modal id="showModal" backdrop="static" isOpen={isOpen} centered>
      <ModalHeader className="bg-light p-3" toggle={() => setIsOpen(false)}>
        Add Permission
      </ModalHeader>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onCreatePermission}>
        <Form>
          <ModalBody>
            <div className="mb-1">
              <Label className="form-label">Route *</Label>
              <Input name="route" type="text" placeholder="/route" />
            </div>

            <div className="mb-1">
              <Label className="form-label">Can *</Label>
              <Input name="can" placeholder="route.nav" type="text" />
            </div>

            <div className="mb-1">
              <Label className="form-label">Description *</Label>
              <Input name="description" type="text" placeholder="Can view the route page" />
            </div>

            <div className="mb-1">
              <Row>
                <Col>
                  <Label className="form-label">Parent *</Label>
                  <Input
                    name="parent"
                    type="select"
                    options={permissionOptions}
                    isMulti
                    isSearchable
                    hideSelectedOptions={false}
                    closeMenuOnSelect={false}
                  />
                </Col>
                <Col>
                  <Label className="form-label">Group *</Label>
                  <Input name="group" type="select" options={forOptions} hideSelectedOptions={false} />
                </Col>
              </Row>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button type="submit" className="btn btn-success">
                Add Permission
              </button>
            </div>
          </ModalFooter>
        </Form>
      </Formik>
    </Modal>
  );
}
