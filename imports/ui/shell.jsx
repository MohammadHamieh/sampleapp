import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Forming from './FormRender.jsx';
import ContactList from './List';
import AccountsUIWrapper from './AccountsUI.jsx';

const { Header, Content } = Layout;

// class Shell extends Component {
//   render() {
//     return (
//       <Layout>
//         <Header style={{ backgroundColor: 'aqua' }}>
//           <p>Phone Book </p>
//         </Header>
//         <Content>
//           <Row>
//             <Col span={8}>
//               <ContactList />
//             </Col>
//             <Col span={14}>
//               <CForm />
//             </Col>
//           </Row>
//         </Content>
//       </Layout>
//     );
//   }
// }

const Shell = () => (
  <Router>
    <Layout>
      <Header style={{ backgroundColor: 'aqua' }}>
        <AccountsUIWrapper />
        <p>Phone Book </p>
      </Header>
      <br />
      <Content>
        <Row>
          <Col span={8}>
            <ContactList />
          </Col>
          <Col span={14}>
            <Forming />
          </Col>
        </Row>
      </Content>
    </Layout>
  </Router>
);


export default Shell;
