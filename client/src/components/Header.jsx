import { Row, Col, Space } from 'antd';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Row>
        <Col>
          <img src="../assets/images/dogiconedit.png" alt="Logo" className={styles.logo} />
          <Space direction="vertical" size="middle" style={{ paddingBottom: '50px' }}>
          </Space>
        </Col>
        <Col>
        <h1 className={styles.title}>Bone To Pick</h1>
        </Col>
      </Row>
    </header>
  );
}
