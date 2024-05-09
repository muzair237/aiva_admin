import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  TabContent,
  Button,
  Container,
} from 'reactstrap';

const CustomizePermissionModal = ({ isEdit, tabs, permissions, isOpen, setIsOpen }) => {
  const [rightTabs, setRightTabs] = useState(tabs || []);
  const [searchGroupPermission, setSearchGroupPermission] = useState();
  const [verticalTab, setVerticalTab] = useState(rightTabs[0]?.value);

  const filteredPermissions = useMemo(
    () =>
      permissions.filter(
        permission => permission.parent.includes(verticalTab) || permission.can === `${verticalTab}.nav`,
      ),
    [permissions, searchGroupPermission, verticalTab],
  );

  return (
    <Modal
      size="xl"
      id="createPermission"
      isOpen={isOpen}
      toggle={() => setIsOpen(prev => !prev)}
      centered
      tabIndex="-1">
      <ModalHeader toggle={() => setIsOpen(prev => !prev)} className="p-3 bg-soft-success">
        {isEdit ? 'Edit Customize Permissions' : 'Customize Permissions'}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <div className="search-box me-2 mb-0 d-inline-block">
              <input
                type="text"
                onChange={e => {
                  const searchValue = e.target.value;
                  setSearchGroupPermission(searchValue);
                  const filteredTabs = tabs?.filter(ele => ele?.value?.includes(searchValue));
                  setRightTabs(filteredTabs);
                  if (filteredTabs.length > 0) {
                    setVerticalTab(filteredTabs[0]?.value);
                  }
                }}
                value={searchGroupPermission}
                className="form-control search"
                placeholder="Search Permissions Group"
              />
              <i className="bx bx-search-alt search-icon" />
            </div>
          </Col>
          <Col className="text-end pe-5">
            <div className="form-check form-switch form-check-right">
              <Input className="form-check-input" type="checkbox" />
              <Label className="form-check-label" for="flexSwitchCheckRightDisabled">
                Select All Groups Permissions
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  {/* // Sidebar */}
                  <Col lg={3} style={{ maxHeight: '480px', overflowY: 'auto' }}>
                    <Nav tabs className="flex-column nav nav-tabs nav-tabs-custom nav-primary">
                      {rightTabs.map(item => (
                        <NavItem key={item?.value}>
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              'mb-2': true,
                              active: verticalTab === item.value,
                            })}
                            onClick={() => {
                              setVerticalTab(item.value);
                            }}
                            id={`v-pills-${item.value}-tab`}>
                            {item.label}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                  </Col>

                  {/* // content body */}
                  <Col lg={9} style={{ maxHeight: '480px', overflowY: 'auto' }}>
                    <div>
                      {/* // switch search */}
                      <Row style={{ alignItems: 'center' }}>
                        <Col>
                          <Container>
                            <div className="form-check form-switch form-check-right">
                              <Input type="checkbox" className="form-check-input" id="customSwitchsizemd" />
                              <Label className="form-check-label" for="flexSwitchCheckRightDisabled">
                                Select All
                              </Label>
                            </div>
                          </Container>
                        </Col>

                        <Col className="text-end">
                          <div className="search-box me-2 mb-0 d-inline-block">
                            <input type="text" className="form-control search " placeholder="Search permissions" />
                            <i className="bx bx-search-alt search-icon" />
                          </div>
                        </Col>
                      </Row>

                      <TabContent className="text-muted mt-4">
                        <Row>
                          <ul
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              listStyle: 'none',
                              columnGap: '35px',
                            }}>
                            {filteredPermissions.map((item, key) => (
                              <li key={key}>
                                <>
                                  <div className="form-check  mb-3">
                                    <Input className="form-check-input" type="checkbox" />
                                    <Label className="form-check-label" for="formCheck13">
                                      {item.can}
                                    </Label>
                                  </div>
                                </>
                              </li>
                            ))}
                          </ul>
                        </Row>
                      </TabContent>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* //Button */}
        <Row>
          <Col>
            <Button
              className="btn btn-success w-100"
              onClick={() => {
                setModalPermission(false);
                setModalRole(true);
              }}>
              Confirm
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default CustomizePermissionModal;
