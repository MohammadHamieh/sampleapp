import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Layout } from 'antd';
import Forming from './FormRender.jsx';
import ContactList from './List';

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
  <Layout>
    <Header style={{ backgroundColor: 'aqua' }}>
      <p>Phone Book </p>
    </Header>
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
);


export default Shell;
