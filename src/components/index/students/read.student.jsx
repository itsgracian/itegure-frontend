import React, { useState, Fragment, useEffect } from 'react';
import { Col, Row, Button } from 'reactstrap';
import {
  BsFilterLeft,
  BsGrid1X2,
  BsListTask,
  BsTrash2,
  BsBrush, BsCheckCircle
} from 'react-icons/bs';
import CreateStudent from './create.student';
import { connect } from 'react-redux';
import { readAllStudent } from '../../../redux/students/actions';
import { getAllClass } from '../../../redux/classes/actions';

const mapState = (state) => ({
  classReducer: state.classes,
  studentReducer: state.students,
});
const connector = connect(mapState, { readAllStudent, getAllClass });
const ReadStudent = (props) => {
  const { classes } = props.classReducer;
  const { readAll, errors, create } = props.studentReducer;
  const [state, setState] = useState({ isOpen: false, loading: false });
  const onOpen = () => {
    setState({ ...state, isOpen: !state.isOpen });
  };
  useEffect(() => {
    const fetch = () => {
      setState({ ...state, loading: true });
      props.readAllStudent();
      props.getAllClass();
    };
    fetch();
  }, []);
  useEffect(() => {
    if (errors || readAll) {
      setState({ ...state, loading: false });
    }
    if (create) {
      setState({ ...state, isOpen: false });
    }
  }, [props.studentReducer]);
  return (
    <Fragment>
      {state.isOpen && <CreateStudent isOpen={state.isOpen} onOpen={onOpen} />}
      <Col md="8" className="mt-3">
        <div className="mt-3 mb-3">
          <Button type="button" className="p-2" onClick={onOpen}>
            + student
          </Button>
          {create && (
            <div className="font-weight-normal success-message">
              <BsCheckCircle />
              &nbsp; {create.message}
            </div>
          )}
        </div>
        <Row>
          {readAll &&
            readAll.length !== 0 &&
            readAll.map((item, i) => (
              <Col md="6" key={i}>
                <div className="st-div d-flex align-items-center">
                  <div className="ls">
                    <div className="d-flex align-items-center">
                      <div>
                        <BsFilterLeft />
                      </div>
                      <div className="pl-2">{item.name}</div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <BsListTask />
                      </div>
                      <div className="pl-2">
                        <small>
                          {item.school ? item.school : 'school not available'}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <BsGrid1X2 />
                      </div>
                      <div className="pl-2">
                        <small>
                          {item.class ? item.class.name : 'class not available'}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="action ml-2">
                    <div className="action-div">
                      <Button type="button" className="ed">
                        <BsBrush />
                      </Button>
                    </div>
                    <div className="action-div">
                      <Button type="button" className="del">
                        <BsTrash2 />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Col>
    </Fragment>
  );
};
export default connector(ReadStudent);