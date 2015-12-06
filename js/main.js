import React from "react";
import {render} from 'react-dom';
import YoutubePlayer from 'react-youtube-player';
import update from 'react-addons-update';
//import safeHtml from 'safe-html';
import { Col,Glyphicon,Jumbotron, Row,Button,Collapse} from 'react-bootstrap';
var qnas=[
      {
          ID:'1',
          qtext:'Suppose that an object is moving along the curve below. When it is at \\( (1,2) \\), its \\( x \\)-coordinate is chaning at \\(3.7\\) inches per second. How fast is the \\(y\\)-coordinate changing at that moment?',
          atext:`The position of the object can be viewed as a function of time, \\((x(t),y(t))\\). Here, we have
                    \\[ x=x(t)=1,~y=y(t)=2\\]
                    \\[~x'=\\frac{dx}{dt}=3.7\\]
                 and need to find \\( y\'=\\frac{dy}{dt}\\) at that moment.<br>
                 Differentiate the equation with respect to \\(t\\), we obtain
                 \\[ \\frac{d}{dt}\\left( x^2-2xy+3y^2 \\right)=\\frac{d}{dt}(9)\\]
                 \\[2xx'-2(x\'y+xy')+6y'=0 \\]
                 \\[xx' -x'y -xy'+3yy'=0\\]
                 Substitute the given values into the last equation, we have an equation in \\(y'\\)
                 \\[3.7-7.4-y'+6y'=0\\]
                 \\[y'=0.74\\]
                 The velocity of the \\(y\\)-coordinate changing at that moment is \\(0.74\\) inch per second.
                 `,
          videoId:'xyAzDCKHcqg',
      },
      {
          ID:'2',
          qtext:`Suppose a cameraman stands on ground level, \\( 600\\) feet away from a rocket that is set to take off.
          Upon ignition, the rocket rises at a rate of \\(200~ft/sec\\).<br>
            <ul>
            <li>a) Four seconds after ignition, at what rate is the distance between the rocket and the careraman increasing?</li>
            <li>b) Three seconds after ignition, at what rate must the cameraman rotate his camera to keep the rocket in focus?</li>
            </ul>
            `,
          atext:`For more details, watch the video.
          <ul>
                <li>a)\\(\\frac{dD}{dt}=160 ft/sec\\)<br><br></li>

                <li>b)\\(\\frac{d\\theta}{dt}=\\frac{1}{6} rad/sec\\)</li>
          </ul>`,
          videoId:'PvvKKTQGeg8',
      },
      {
          ID:'3',
          qtext:`At 1 PM, ship A is \\(50\\) miles East of Ship B. If ship B is traveling north at \\(20\\) miles per hour and ship A is traveling West at \\(10\\) miles per hour, how quickly is the distance between the the ships increasing (or decreasing) at \\(3\\) PM?`,
          atext:`For more details, watch the video.<br>
                 At \\(3\\) PM, the ships are moving apart at a rate of \\(10\\) miles per hour.    
          `,
          videoId:'-idI1bVNbmo',
      },
      {
          ID:'4',
          qtext:`Suppose you increase a 'window' on a computer monitor by changing its width and height at constant rates \\(4\\) and \\(2\\) cm/sec. respectively.
                Suppose also that the initial size of the window is 3x6 cm (width x height).
                <ul>
                <li>a) How fast is the area of the window changing at the moment when the width is \\(19\\) cm?</li>
                <li>b) How fast is the area of the window changing at the moment when the window is square?</li>
                </ul>
                `,
          atext:`For more details, watch the video.
          <ul>
                <li>a) \\(A'(4)=94cm^2/sec\\)<br><br></li>
                <li>b) \\(A'(\\frac{3}{2})=-54 cm^2/sec\\)</li>
          </ul>`,
          videoId:'zqD2r1BgUjA',
      },
      {
          ID:'5',
          qtext:`The combined electrical resistance \\(R\\) of \\(R_1\\) and \\(R_2\\), connected in parallel, is given by
          \\[\\frac{1}{R}=\\frac{1}{R_1}+\\frac{1}{R_2}\\]
          where \\(R,R_1\\) and \\(R_2\\) are measured in ohms. \\(R_1\\) and \\(R_2\\) are increasing at rates of \\(1\\) and \\(1.5\\) ohms per second, respectively. At what rate is \\(R\\) changing when \\(R_1=50~ohms\\) and \\(R_2=75~ohms\\)?
          `,
          atext:`For more details, watch the video.<br>
                 The rate of change of combined resistance \\(R\\) is \\(0.6\\) ohms per second.    
          `,
          videoId:'atJaoBHVWfc',
      },
];
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            clickCount: 0,
        };
    }
    render() {
        return (
            <div>
                <Row className="container">
                    <Col xs={12} sm={6} md={5} className="text-left">
                    <h2>MA-441 - Related Rates</h2>
                    </Col>
                    <Col xs={12} sm={6} md={6} className="text-right vertical-bottom">
                        <a href="http://www.qcc.cuny.edu/mathCS/"><h4>Back to the Math and CS </h4></a>
                    </Col>
                </Row>
                <div className="container">
                    <QNA qnas={qnas}/>
                </div>
            </div>
        );
    }

}
class Tex extends React.Component {
    constructor() {
        super();
        /*
        this.state = {
            clickCount: 0,
        };
        */
    }
    render() {
        var config = {
            allowedTags: ["div", "span", "b", "i", "a"],
            allowedAttributes: {
                'class': {
                allTags: true
                },
                'href': {
                    allowedTags: ["a"],
                        filter: function (value) {
                        // Only let through http urls
                        return !/^https?:/i.exec(value);
                    }
                }
            }
        };
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
        var ar=new Array(props.qnas.length).fill(false);
        this.state = {
            open: ar,
            index:0,
            playbackState:'unstated',
        };
    }
    left(){
        var index=this.state.index;
        var len=this.props.qnas.length;
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
        var len=this.props.qnas.length;
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
        var {videoId,ID,qtext,atext} = this.props.qnas[index];
        var len=this.props.qnas.length;
        //https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        return (
            <div className="container">
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
var mainNode=document.getElementById('main');
render((
    <Main/>
), mainNode );
//Katex


//render((<Question/>),document.getElementById('question'));
//render(accordionInstance,document.getElementById('question'));