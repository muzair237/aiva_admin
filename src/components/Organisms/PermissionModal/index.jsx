import React, { useEffect, useMemo } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../Atoms/Label';
import generateFormSchema from '../../../helpers/validationSchemas';
import Input from '../../Atoms/Input';
import permissionThunk from '../../../slices/permissions/thunk';

export default function PermissionModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const parents = useSelector(state => state.Permission.parents || []);

  const permissionOptions = useMemo(
    () => [
      {
        label: 'No-Parent',
        value: '$',
      },
      ...parents.map(({ can }) => ({
        label: can.split('.nav')[0],
        value: can.split('.nav')[0],
      })),
    ],
    [parents],
  );

  const { initialValues, validationSchema } = generateFormSchema({
    route: {
      required: true,
      patterns: [
        {
          pattern: /^\/[a-zA-Z/_.-]+$/,
          message: 'Route can only contain letters, underscores, dots, and must start with a slash.',
        },
        {
          pattern: /^.{0,40}$/,
          message: "Route's Maximum Character Length Is 40.",
        },
      ],
    },
    can: {
      required: true,
      patterns: [
        {
          pattern: /^[a-zA-Z._-]+$/,
          message: 'Can can only contain letters,underscores and dashes.',
        },
        {
          pattern: /^.{0,40}$/,
          message: "Can's Maximum Character Length Is 40.",
        },
      ],
    },
    description: {
      required: true,
      patterns: [
        {
          pattern: /^.{0,40}$/,
          message: "Description's Maximum Character Length Is 40.",
        },
      ],
    },
  });

  const onSubmit = payload => {
    console.log(payload);
  };

  useEffect(() => {
    // if (!permissions?.length > 0)
    dispatch(permissionThunk.getUniqueParents());
  }, []);

  return (
    <Modal id="showModal" backdrop="static" isOpen={isOpen} centered>
      <ModalHeader className="bg-light p-3" toggle={() => setIsOpen(false)}>
        Add Permission
      </ModalHeader>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
