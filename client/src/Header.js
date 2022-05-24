import { Container, Row, Col, Badge } from "react-bootstrap";

const Header = ({ online, name }) => (
  <Container className="monitor-header" fluid>
    <Row>
      <Col>
        <a href="https://sotefin.com">
          <Badge bg="light" text="dark">
            SOTEFIN SA
          </Badge>
        </a>
      </Col>
      <Col>
        <Badge bg="primary">{name}</Badge>
      </Col>
      <Col>
        {online ? (
          <Badge bg="success">ONLINE</Badge>
        ) : (
          <Badge bg="danger">OFFLINE</Badge>
        )}
      </Col>
    </Row>
  </Container>
);

export default Header;
