import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withRouter from '../components/Common/withRouter';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import {
  changeLayout,
  changeSidebarTheme,
  changeLayoutMode,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarImageType,
} from '../slices/layouts/thunk';

const Layout = props => {
  const [headerClass, setHeaderClass] = useState('');
  const dispatch = useDispatch();
  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
  } = useSelector(state => ({
    layoutType: state.Layout.layoutType,
    leftSidebarType: state.Layout.leftSidebarType,
    layoutModeType: state.Layout.layoutModeType,
    layoutWidthType: state.Layout.layoutWidthType,
    layoutPositionType: state.Layout.layoutPositionType,
    topbarThemeType: state.Layout.topbarThemeType,
    leftsidbarSizeType: state.Layout.leftsidbarSizeType,
    leftSidebarViewType: state.Layout.leftSidebarViewType,
    leftSidebarImageType: state.Layout.leftSidebarImageType,
  }));
  // class add remove in header
  function scrollNavigation() {
    const scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass('topbar-shadow');
    } else {
      setHeaderClass('');
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollNavigation, true);
  });

  useEffect(() => {
    window.addEventListener('scroll', scrollNavigation);

    return () => {
      window.removeEventListener('scroll', scrollNavigation);
    };
  }, []);
  useEffect(() => {
    if (
      layoutType ||
      leftSidebarType ||
      layoutModeType ||
      layoutWidthType ||
      layoutPositionType ||
      topbarThemeType ||
      leftsidbarSizeType ||
      leftSidebarViewType ||
      leftSidebarImageType
    ) {
      dispatch(changeLeftsidebarViewType(leftSidebarViewType));
      dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
      dispatch(changeSidebarTheme(leftSidebarType));
      dispatch(changeLayoutMode(layoutModeType));
      dispatch(changeLayoutWidth(layoutWidthType));
      dispatch(changeLayoutPosition(layoutPositionType));
      dispatch(changeTopbarTheme(topbarThemeType));
      dispatch(changeLayout(layoutType));
      dispatch(changeSidebarImageType(leftSidebarImageType));
    }
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    dispatch,
  ]);
  const onChangeLayoutMode = value => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  return (
    <>
      <div id="layout-wrapper">
        <Header headerClass={headerClass} layoutModeType={layoutModeType} onChangeLayoutMode={onChangeLayoutMode} />
        <Sidebar layoutType={layoutType} />
        <div className="main-content">
          {props.children}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default withRouter(Layout);
