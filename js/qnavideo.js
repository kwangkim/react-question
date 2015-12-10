import React from "react";
import { default as Video} from 'react-html5video';
import update from 'react-addons-update';
import {ListGroupItem,ListGroup,Col,Glyphicon,Jumbotron,Row,Button,Collapse} from 'react-bootstrap';
function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}
export default class QNAvideo extends React.Component {
    constructor() {
        super();
    }
    render() {
        var title=this.props.title;
        var backlink=this.props.backlink;
        var backtitle=this.props.backtitle;
        var data=this.props.data;
        var SampleA="https://www.cuny.edu/academics/testing/Sample-CEAFE-A.pdf";
        var SampleB="https://www.cuny.edu/academics/testing/Sample-CEAFE-B.pdf";
        return (
            <div className="container">
                <Row>
                    <Col xs={12} sm={6} md={6} className=" text-left">
                    <h2>{title}</h2>
                    </Col>
                    <Col xs={12} sm={6} md={6} className="text-right">
                       <a  href={backlink}>
                           <h4 style={{marginTop:30}}> Back to the Math and CS</h4>
                       </a>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={6} className="text-left">
                       <a  href={SampleA}>
                           <h4>SAMPLE A(PDF)</h4>
                       </a>
                    </Col>
                    <Col xs={6} sm={6} md={6} className="text-right">
                       <a  href={SampleB}>
                           <h4>SAMPLE B(PDF)</h4>
                       </a>
                    </Col>
                </Row>
                <div className="container">
                    <QNAmc data={data}/>
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
class Check extends React.Component {
    constructor() {
        super();
    }
    render(){
        if(this.props.evaluated){
            if(this.props.correct) return (<Button bsSize="large" bsStyle="primary">Correct</Button>);
            else return (<Button bsSize="large" bsStyle="danger">Incorrect</Button>);
        }
        else return (
            <Button className="text-center" bsSize="large" bsStyle="primary" onClick={ this.props.check}>
                Check!
            </Button>
        
        );
    }
}
class QNAmc extends React.Component {
    constructor(props) {
        super(props);
        var len = props.data.length;
        var ne =fillArray(false,len);
        var nc =fillArray(null,len);
        var no =fillArray(false,len);;
        var ns =fillArray(null,len);
        var defaultvideoId=props.data[0].videoId;
        this.state = {
            evaluated: ne,
            correct: nc,
            open: no,
            select:ns,
            index:0,
            playing:false,
            videoId:defaultvideoId,
        };
    }
    left(){
        var index=this.state.index;
        var len=this.props.data.length;
        var newindex=index-1;
        if(newindex<0){
            newindex=newindex + len;
        }
        var newvideoId=this.props.data[newindex].videoId;
        this.setState({
            index:newindex,
            videoId:newvideoId,
        });
        
        
    }
    right(){
        var index=this.state.index;
        var len=this.props.data.length;
        var newindex=index+1;
        if(newindex>=len){
            newindex=newindex - len;
        }
        var newvideoId=this.props.data[newindex].videoId;
        this.setState({
            index:newindex,
            videoId:newvideoId,
        });
        
    }
    reloadVideo(){
        this.refs.video.load();
    }
    //
    componentDidUpdate(){
        this.reloadVideo();
    }
    checkanswer(){
        var index=this.state.index;
        var select=this.state.select[index];
        var evaluated=this.state.evaluated[index];
        if(!evaluated){
            var ans=this.props.data[index].ans;
            var newevaluated=update(this.state.evaluated,{
                 [index]: {$set: true}          
            });
            this.setState({
                evaluated: newevaluated,
            });
            var correct;
            if (select===ans)correct=true;
            else correct=false;
        
            var newcorrect=update(this.state.correct,{
                 [index]: {$set: correct }          
            });
            this.setState({
                correct: newcorrect,
            });
            this.updateopen();
        }
        
    }
    updateopen(){
        var index=this.state.index;
        var newopen=update(this.state.open,{
             [index]: {$set: !this.state.open[index]}          
        });
        
        this.setState({
            open: newopen,
        });
    }
    choiceclass(id){
        var index=this.state.index;
        var select=this.state.select[index];
        var evaluated=this.state.evaluated[index];
        var {ans}=this.props.data[index];
        if(!evaluated){
            if(select===id){
                return 'bg-active'; // Select
            }
            else return '';
        }
        else{
            if(id===ans) return 'bg-info';
            else if(id===select) return 'bg-danger';
        }
    }
    choicehandle( id ){
        
        var index=this.state.index;
        var evaluated=this.state.evaluated[index];
        if(!evaluated){
            var newselect=update(this.state.select,{
                [index]: {$set: id}          
            });
            this.setState({
                select : newselect,
            });
        }
    }
    render() {
        var {index,playing}=this.state;
        var evaluated=this.state.evaluated[index];
        var correct=this.state.correct[index];
        var select=this.state.select[index];
        var open=this.state.open[index];
        var {ID,qtext,choices,ans} = this.props.data[index];
        //var path='http://media.acc.qcc.cuny.edu/NonDBEvents/MathCS/Videos/';
        //var path='/videos/';
        var path='http://www.qcc.cuny.edu/mathCS/study/MA010/videos/';
        var choiceclass=this.choiceclass.bind(this);
        var choicehandle=this.choicehandle.bind(this);
        //var len=this.props.data.length;
        //https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        return (
            <div>
                <Jumbotron className="jumbotronquiz">
                    <Row className="text-center">
                        <Button className="text-center" bsSize="large" bsStyle="primary" onClick={this.left.bind(this)}>
                            <Glyphicon glyph="triangle-left" />
                        </Button> 
                        &nbsp;&nbsp;
                        <Check className="text-center" check={this.checkanswer.bind(this)}evaluated={this.state.evaluated[this.state.index]} correct={this.state.correct[this.state.index]}/>
                        &nbsp;&nbsp;
                        <Button className="text-center" bsSize="large" bsStyle="primary" onClick={ this.right.bind(this)}>
                            <Glyphicon glyph="triangle-right" />
                        </Button>
                    </Row>
                    <Row>
                        <h2 className="text-center"> Question - {ID} </h2>
                    </Row>
                    <Row>
                    &nbsp;
                    </Row>
                    <Row>
                        <p><Tex bind={qtext} /></p>    
                    </Row>
                     <Row className="container">
                        {choices.map(function(choice,i){
                            //var cc=this.choiceclass.bind(this);
                            //var ch=this.choicehandle.bind(this);
                            //<Row key={i} className={choiceclass(choice)}>
                            var choicebound=choicehandle.bind(this,choice.ID);
                            var mark=choice.ID;
                            if(evaluated){
                               if(choice.ID===ans) mark="O";
                               else mark="X";
                            }
                            return(
                                <Row key={i} className={choiceclass(choice.ID)} onClick={choicebound}>
                                    <p><strong>{mark+' ) '}</strong><Tex bind={choice.ctext}/></p>
                                </Row>
                            );
                        })}
                    </Row>
                    <Row>
                    &nbsp;
                    </Row>
                  <Collapse in={open}>
                        <div>
                            <Row className="text-center">
                                <Video preload="auto" controls ref="video" src={path+this.state.videoId}>
                                    <source src={path+this.state.videoId} type="video/mp4" />
                                </Video>
                            </Row>
                        </div>
                    </Collapse>
                </Jumbotron>           
            </div>
        );
    }
}
/*
                                <Row key={i} className={choiceclass(choice.ID)} onClick={choicebound}>
                                    <label >
                                        <Input style={{visibility:'hidden'}} type="radio" name="mychoice" value={choice.ID} ref={'input'+i}/>
                                        <p><strong>{mark+' ) '}</strong><Tex bind={choice.ctext}/></p>
                                    </label>
                                </Row>
  
*/

/*
var mainNode=document.getElementById('main');
render((
    <Main/>
), mainNode );
*/
//Katex


//render((<Question/>),document.getElementById('question'));
//render(accordionInstance,document.getElementById('question'));