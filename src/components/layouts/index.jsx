import React, { useState, useEffect } from 'react';
import Header from '../helpers/menus/home.header';
import Login from '../index/auths/login';
import Subscribe from '../index/auths/subscribe';
import '../../assets/css/style.scss';
import { currentProfile } from '../../redux/subscriptions/actions';
import { connect } from 'react-redux';

const mapState = (state) => ({
  subscriptionReducer: state.subscriptions,
});
const connector = connect(mapState, { currentProfile });
const Index = (props) => {
  const [state, setState] = useState({ login: false, subscribe: false });
  const onOpen = ({ log, sub }) => {
    setState({ ...state, login: log, subscribe: sub });
  };
  const onClose = () => {
    setState({ ...state, login: false, subscribe: false });
  };
  useEffect(() => {
    const fetch = () => {
      props.currentProfile();
    };
    fetch();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="index-layout">
      {state.login && <Login onClose={onClose} />}
      {state.subscribe && <Subscribe onClose={onClose} />}
      <Header onOpen={onOpen} />
      {props.children}
    </div>
  );
};
export default connector(Index);
