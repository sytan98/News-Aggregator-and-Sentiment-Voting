import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios'

export default class Headline extends React.Component {
    constructor(props){
        super(props)
        this.state = {open: false, unchecked:true, positive_votes:0, neutral_votes:0, negative_votes:0}
    } 
    
    componentDidMount(){
        console.log("Getting Votes")
        axios.get('api/v1/votes', {params: {'news_id':this.props.news_id}})
            .then(res => {
                console.log(res.data)
                let positive_vote = 0
                let negative_vote = 0
                let neutral_vote = 0
                for (var i = 0; i < res.data.length; i++){
                    if (res.data[i][1] == "positive"){
                        positive_vote += 1
                    } else if (res.data[i][1] == "neutral"){
                        neutral_vote += 1
                    } else {
                        negative_vote += 1
                    }
                }
                this.setState({positive_votes: positive_vote, negative_votes: negative_vote, neutral_votes: neutral_vote})
            })
    }


    handleClick(news_id, vote){
        this.setState({open:true})        
        console.log("Sending Vote")
        const vote_json = {"news_id": news_id, "vote": vote}
        axios.post('api/v1/votes', vote_json)
            .then(res => console.log(res.data))
        
        console.log(typeof this.state.positive_votes)
        console.log(typeof this.state.neutral_votes)
        console.log(typeof this.state.negative_votes)
        console.log(vote)
        if (vote == "neutral") {
            this.setState({neutral_votes: this.state.neutral_votes + 1})
        } else if (vote == "positive") {
            this.setState({positive_votes: this.state.positive_votes + 1})
        } else {
            this.setState({negative_votes: this.state.negative_votes + 1})
        } 
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
                    <Button disabled={this.state.open ? true : false} onClick={() => this.handleClick(this.props.news_id, "positive")} variant="light" size="sm">
                        Positive <Badge>{this.state.positive_votes}</Badge>
                    </Button>{' '}
                    <Button  disabled={this.state.open ? true : false} onClick={() => this.handleClick(this.props.news_id, "neutral")} variant="info" size="sm">
                        Neutral <Badge>{this.state.neutral_votes}</Badge>
                    </Button>{' '}
                    <Button  disabled={this.state.open ? true : false} onClick={() => this.handleClick(this.props.news_id, "negative")} variant="dark" size="sm">
                        Negative <Badge>{this.state.negative_votes}</Badge>
                   </Button>{' '}
                    <Collapse in={this.state.open}>
                        <div id="example-collapse-text"> <br /> Thanks for voting:)</div>
                    </Collapse>
                </Card.Body>
                <Card.Footer>
                    <Card.Link href={this.props.link}>Article Link</Card.Link>{' '}
                    <Card.Link onClick={() =>this.handleCheck()} size="sm">Done Reading</Card.Link>
                    <br />
                    <small>Article posted on {this.props.date}</small>
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