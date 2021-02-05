import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import axios from 'axios'

export default class Headline extends React.Component {
    constructor(props){
        super(props)
        this.state = {open: false, unchecked:true}
    } 

    handleClick(news_id, vote){
        this.setState({open:true})        
        console.log("Sending Vote")
        const vote_json = {"news_id": news_id, "vote": vote}
        axios.post('api/v1/votes', vote_json)
            .then(res => console.log(res.data))
    }

    handleCheck(){
        this.setState({unchecked:false})
    }

    render() {
        let variant;
        if (this.props.compound_sentiment >0){
            variant = "success"
        } else if (this.props.compound_sentiment == 0){
            variant = "warning"
        } else {
            variant = "danger"
        }
        const content = this.state.unchecked 
        ?  <Card bg={variant} text='white'>
                <Card.Body>
                    <Card.Title >{this.props.headline}</Card.Title>
                    <Card.Text>Sentiment level = {this.props.compound_sentiment}</Card.Text>
                    <Card.Text>Do you agree with the sentiment level? Vote Below!</Card.Text>
                    <Button onClick={() => this.handleClick(this.props.news_id, "positive")} variant="light" size="sm">Positive</Button>{' '}
                    <Button onClick={() => this.handleClick(this.props.news_id, "neutral")} variant="info" size="sm">Neutral</Button>{' '}
                    <Button onClick={() => this.handleClick(this.props.news_id, "negative")} variant="dark" size="sm">Negative</Button>{' '}
                    <Collapse in={this.state.open}>
                        <div id="example-collapse-text"> <br /> Thanks for voting:)</div>
                    </Collapse>
                    
                </Card.Body>
                <Card.Footer>
                    <Card.Link href={this.props.link}>Article Link</Card.Link>{' '}
                    <Card.Link onClick={() =>this.handleCheck()} size="sm">Done Reading</Card.Link>
                </Card.Footer>
            </Card> 
        : null
        return(
            <div>
                {content}
            </div>
        )
    }
}