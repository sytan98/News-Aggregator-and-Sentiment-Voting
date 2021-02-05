import './App.css';
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import News from './components/news.component';

function App() {
  return (
    <div className="App">
        <Jumbotron>
            <h1>News Aggregator and Sentiment Voting</h1>
            <p>The purpose of this Web App is to web scrap the latest news from each prominent News Source in Singapore.<br />
               This Web App aggregates them and provides a sentiment level for each headline news.</p>
            <p>
                <Button variant="primary">View the Source Code</Button>
            </p>
        </Jumbotron>
        <Container>
            <Row>
                <Col>
                    <News source="CNA"/>
                </Col>
                <Col>
                    <News source="Mothership"/>
                </Col>
 
            </Row>
        </Container>
    </div>
  );
}

export default App;
