import React, { useState, useMemo, useRef } from 'react';
import { Row, Col } from 'reactstrap';
import Select from 'react-select';
import debounce from 'lodash/debounce';

const PermissionGlobalFilter = ({ setFilters }) => {
  const [searchText, setSearchText] = useState('');
  const debounceRef = useRef(0);
  const [permissionFilter, setPermissionFilter] = useState({ label: 'Latest', value: 'latest' });
  const [typeFilter, setTypeFilter] = useState();

  const options = [
    { label: 'A - Z', value: 'asc' },
    { label: 'Z - A', value: 'desc' },
    { label: 'Latest', value: 'latest' },
    { label: 'Earliest', value: 'earliest' },
  ];

  const typeOptions = [
    { label: 'All', value: 'all' },
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'USER', value: 'USER' },
  ];

  const onSearchCallText = useMemo(
    () =>
      debounce(value => {
        debounceRef.current += 1;
        const LocalRef = debounceRef.current;
        setTimeout(() => {
          if (LocalRef === debounceRef.current) {
            setFilters(prev => ({
              ...prev,
              searchText: value,
            }));
          }
        }, 1);
      }, 300),
    [],
  );

  const onChangeFilter = useMemo(
    () => filter => {
      setPermissionFilter(filter);
      setFilters(prev => ({
        ...prev,
        sort: filter.value,
      }));
    },
    [],
  );
  const onChangeTypeFilter = useMemo(
    () => filter => {
      setTypeFilter(filter);
      setFilters(prev => ({
        ...prev,
        type: filter.value,
      }));
    },
    [],
  );

  return (
    <>
      <Col sm={4}>
        <div className="form-icon">
          <input
            type="text"
            className="form-control form-control-icon search rounded-pill"
            placeholder="Search..."
            onChange={({ target: { value } }) => {
              setSearchText(value);
              onSearchCallText(value.trim());
            }}
          />
          <i className="bx bx-search-alt search-icon" />
        </div>
      </Col>
      <Col xl={7}>
        <Row className="g-3">
          <Col sm={4}>
            <div>
              <Select
                // styles={customStyles}
                value={permissionFilter}
                onChange={onChangeFilter}
                options={options}
                name="choices-single-default"
                id="idStatus"
              />
            </div>
          </Col>
          <Col sm={4}>
            <div>
              <Select
                // styles={customStyles}
                value={typeFilter}
                onChange={onChangeTypeFilter}
                options={typeOptions}
                name="choices-single-default"
                id="idStatus"
              />
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export { PermissionGlobalFilter };
