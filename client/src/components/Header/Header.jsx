import { Row, Col, Space, Layout } from 'antd';
import styles from './Header.module.css';
import dogIcon from '../../assets/images/dogiconedit.png'
import { ADD_USER, LOGIN } from '../../utils/mutations'
import Auth from "../../utils/auth"
import {Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

const {Header} = Layout

 function Nav() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }
  const logout =(event)=>{
    event.preventDefault();
   Auth.logout();
  }
  useEffect(()=> {
    const mediaQuery = window.matchMedia('(max-width:840px)');
    const handleMediaQueryChange= (e)=>{
      console.log(e.matches)
      setCollapsed(e.matches);
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange);return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  return (
    // <Header className={`header ${collapsed ? 'collapsed' : ''}`}>
    <Header className={styles.header}>
      <Row gutter = {[16,16]}>
        <Col span = {8}>
          <div className={styles.logobox}>
          <img src={ dogIcon } alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Bone To Pick</h1>

          </div>
        </Col>
        {/* set span to dynamicall shift based on window size? ( media query would suffice in CSS) */}
        <Col span={8}>
        </Col>
        <Col span={8}>
        <Space direction="horizontal" size="middle" style={{ paddingLeft: '50px' }}>
         <Link>
         <h2>Profile</h2>
         </Link>
         <Link to='/login'>
         <h2>Login</h2>
         </Link>
        </Space>
        </Col>
      </Row>
    </Header>
  );
}
export default Nav