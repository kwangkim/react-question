import React from "react";
import YoutubePlayer from 'react-youtube-player';
import update from 'react-addons-update';
//import safeHtml from 'safe-html';
import { Col,Glyphicon,Jumbotron,Row,Button,Collapse} from 'react-bootstrap';
export default class QNApage extends React.Component {
    constructor() {
        super();
    }
    render() {
        var title=this.props.title;
        var backlink=this.props.backlink;
        var backtitle=this.props.backtitle;
        var data=this.props.data;
        console.log(data.length);
        return (
            <div className="container">
                <Row>
                    <Col sm={6} md={6} className=" text-left">
                    <h2>{title}</h2>
                    </Col>
                    <Col  sm={6} md={6} className="text-right">
                       <a  href={backlink}>
                           <h4 style={{marginTop:30}}> Back to the Math and CS</h4>
                       </a>
                    </Col>
                </Row>
                <div>
                    <QNA data={data}/>
                </div>
            </div>
        );
    }

}
class Tex extends React.Component {
    constructor() {
        super();
    }
    render() {
        //https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        var newSpan=document.createElement("span");
        newSpan.innerHTML=this.props.bind;
        //var newText=document.createTextNode(this.props.bind);
        //newSpan.appendChild(newText);
        renderMathInElement(newSpan);
        var html=function(){
            return {__html: newSpan.innerHTML};
        };
        return (
            <span dangerouslySetInnerHTML={html()}/>
        );
    }

}
class QNA extends React.Component {
    constructor(props) {
        super(props);
        var ar=new Array(props.data.length).fill(false);
        this.state = {
            open: ar,
            index:0,
            playbackState:'unstated',
        };
    }
    left(){
        var index=this.state.index;
        var len=this.props.data.length;
        var newindex=index-1;
        if(newindex<0){
            newindex=newindex + len;
        }
        this.setState({
            index:newindex,
        });
    }
    right(){
        var index=this.state.index;
        var len=this.props.data.length;
        var newindex=index+1;
        if(newindex>=len){
            newindex=newindex - len;
        }
        this.setState({
            index:newindex,
        });
    }
    updateopen(){
        var i=this.state.index;
        var newopen=update(this.state.open,{
            [i ] : {$set: !this.state.open[i]}          
        });
        
        this.setState({
            open: newopen,
        });
    }
    render() {
        var index=this.state.index;
        var {videoId,ID,qtext,atext} = this.props.data[index];
        //var len=this.props.data.length;
        //https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        return (
            <div>
                <Jumbotron >
                    <Row>
                    <h2 className="text-center"> Question - {ID}</h2>
                    </Row>
                    <Row>
                        <p><Tex bind={qtext} /></p>    
                    </Row>
                    <Row className="text-center">
                            <Button className="text-center" bsStyle="primary" onClick={this.left.bind(this)}>
                                <Glyphicon glyph="triangle-left" />
                            </Button> 
                            &nbsp;
                            <Button className="text-center" bsStyle="primary" onClick={ this.updateopen.bind(this) }>
                              Answer
                            </Button>
                            &nbsp;
                            <Button className="text-center" bsStyle="primary" onClick={ this.right.bind(this)}>
                                <Glyphicon glyph="triangle-right" />
                            </Button>
                    </Row>
                    <Row>
                    &nbsp;
                    </Row>
                    <Collapse in={this.state.open[index]}>
                        <div>
                        <Row className="text-center">
                                  <YoutubePlayer
                                    videoId={videoId}
                                    configuration={{
                                        showinfo: 0,
                                        autohide: 1,
                                        modestbranding:1,
                                        rel:0,
                                    }}
                                    width="100%"
                                    height="400"
                                    playbackState="unstarted"
                                  />
                        </Row>
                        <Row>
                            <p>
                                <Tex bind={atext}/>
                            </p>
                        </Row>
                        </div>
                    </Collapse>
                </Jumbotron>           
            </div>
        );
    }
}

/*
var mainNode=document.getElementById('main');
render((
    <Main/>
), mainNode );
*/
//Katex


//render((<Question/>),document.getElementById('question'));
//render(accordionInstance,document.getElementById('question'));