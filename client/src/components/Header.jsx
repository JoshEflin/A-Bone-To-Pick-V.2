import { Row, Col, Space } from 'antd'


export default function Header() {
    return (
        <header>
            <Row>
                <Col>
                <img src ="../assets/images/dogiconedit.png"alt="Logo"/>
                </Col>
                <Col>
                <Space
    direction="vertical"
    size="middle"
    style={{paddingBottom: '50px'}}
    >
            
            </Space>
      </Col>
            <h1>Bone To Pick</h1>
            </Row>
        </header>
    )
}