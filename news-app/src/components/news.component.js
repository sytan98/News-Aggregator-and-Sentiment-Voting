import React from 'react'
import Headline from './headline.component'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

export default class News extends React.Component {
    constructor(props){
        super(props);
        this.state = {positive_headlines:[], negative_headlines:[], neutral_headlines:[]};
    }

    componentDidMount(){
        console.log("Getting News")
        axios.get('http://127.0.0.1:5000/api/v1/headlines', {params: {'source':this.props.source}})
            .then(res => {
                console.log(res.data);
                let positive_news = []
                let negative_news = []
                let neutral_news = []
                for (var i = 0; i < res.data.length; i++){
                    if (res.data[i][4] > 0){
                        positive_news.push(res.data[i])
                    } else if (res.data[i][4] == 0){
                        neutral_news.push(res.data[i])
                    } else {
                        negative_news.push(res.data[i])
                    }
                }
                this.setState({positive_headlines: positive_news, negative_headlines: negative_news, neutral_headlines: neutral_news})
            })
    }

    render() {
        let image_path = this.props.source + ".png"
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs md lg="10"><h1>{this.props.source}</h1> </Col>
                        <Col><Image src={image_path} fluid/></Col>
                    </Row>   
                </Container>
                <br />
                <Card bg="Success">
                    <Card.Header as="h4">Positive News</Card.Header>
                    {this.state.positive_headlines.map((headline) =>
                        <Headline 
                            news_id={headline[0]} 
                            headline={headline[1]}
                            link={headline[2]}
                            compound_sentiment={headline[4]}
                        />
                    )}
                </Card>
                <br />
                <Card bg="Warning">
                    <Card.Header as="h4">Neutral News</Card.Header>
                    {this.state.neutral_headlines.map((headline) =>
                        <Headline
                            news_id={headline[0]} 
                            headline={headline[1]}
                            link={headline[2]}
                            compound_sentiment={headline[4]}
                        />
                    )}
                </Card>
                <br />
                <Card bg="Success">
                    <Card.Header as="h4">Negative News</Card.Header>
                    {this.state.negative_headlines.map((headline) =>
                        <Headline 
                            news_id={headline[0]} 
                            headline={headline[1]}
                            link={headline[2]}
                            compound_sentiment={headline[4]}
                        />
                    )}
                </Card>
            </div>
        )
    }
}