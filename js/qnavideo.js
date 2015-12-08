import React from "react";
import { default as Video} from 'react-html5video';
import update from 'react-addons-update';
//import safeHtml from 'safe-html';
import { Input,Col,Glyphicon,Jumbotron,Row,Button,Collapse} from 'react-bootstrap';
export default class QNAvideo extends React.Component {
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
class Correct extends React.Component {
    constructor() {
        super();
    }
    render(){
        console.log(this.props.correct);
        if(this.props.evaluated){
            if(this.props.correct) return (<Button bsStyle="primary">Correct</Button>);
            else return (<Button bsStyle="danger">Incorrect</Button>);
        }
        else return (<span></span>);
    }
}
class QNAmc extends React.Component {
    constructor(props) {
        super(props);
        var len = props.data.length;
        var ne =new Array(len).fill(false);
        var nc =new Array(len).fill(null);
        var no =new Array(len).fill(false);
        var ns =new Array(len).fill(null);
        this.state = {
            evaluated: ne,
            correct: nc,
            open: no,
            select:ns,
            index:0,
            playing:false,
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
        this.refs.video.pause();
        
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
        this.refs.video.pause();
    }
    checkanswer(){
        var index=this.state.index;
        var select=this.state.select[index];
        var ans=this.props.data[index].ans;
        console.log(ans);
        console.log(select);
        var newevaluated=update(this.state.evaluated,{
             [index]: {$set: true}          
        });
        this.setState({
            evaluated: newevaluated,
        });
        var correct;
        if (select===ans)correct=true;
        else correct=false;
    
        var newcorrect=update(this.state.evaluated,{
             [index]: {$set: correct }          
        });
        console.log(newcorrect);
        this.setState({
            correct: newcorrect,
        });
        this.updateopen();
        
    }
    updateopen(){
        var index=this.state.index;
        var newopen=update(this.state.open,{
             [index]: {$set: !this.state.open[index]}          
        });
        
        this.setState({
            open: newopen,
        });
        this.refs.video.pause();
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
        var {evaluated,correct,select,open,index,playing}=this.state;
        var {videoId,ID,qtext,choices,ans} = this.props.data[index];
        var path='http://media.acc.qcc.cuny.edu/NonDBEvents/MathCS/Videos/';
        var choiceclass=this.choiceclass.bind(this);
        /*var choiceclass=function(id){
            console.log("select");
            console.log(select[index]);
            console.log(id);
            console.log(evaluated);
            if(!evaluated){
                if(id==select[index]) {
                    console.log("same");
                    return 'bg-active' ;   
                }
                else return 'bg-warning';
            }else{
                
            }
                
        };
        */
         var choicehandle=this.choicehandle.bind(this);
        //var len=this.props.data.length;
        //https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        return (
            <div>
                <Jumbotron className="jumbotronquiz">
                    <Row>
                        <h2 className="text-center"> Question - {ID}<Correct evaluated={evaluated[index]} correct={correct[index]}/></h2>
                    </Row>
                    <Row>
                        <p><Tex bind={qtext} /></p>    
                    </Row>
                     <Row>
                        {choices.map(function(choice,i){
                            //var cc=this.choiceclass.bind(this);
                            //var ch=this.choicehandle.bind(this);
                            //<Row key={i} className={choiceclass(choice)}>
                            var choicebound=choicehandle.bind(this,choice.ID);
                            var mark=choice.ID;
                            if(evaluated[index]){
                               if(choice.ID===ans) mark="O";
                               else mark="X";
                            }
                            return(
                                
                                <Row key={i} className={choiceclass(choice.ID)} onClick={choicebound}>
                                        <label >
                                        <Input style={{visibility:'hidden'}} type="radio" name="mychoice" value={choice.ID} ref={'input'+i}/>
                                        <p><strong>{mark+' ) '}</strong><Tex bind={choice.ctext}/></p>
                                    </label>
                                </Row>
                            );
                        })}
                    </Row>
                    <Row className="text-center">
                            <Button className="text-center" bsStyle="primary" onClick={this.left.bind(this)}>
                                <Glyphicon glyph="triangle-left" />
                            </Button> 
                            &nbsp;
                            <Button className="text-center" bsStyle="primary" onClick={ this.checkanswer.bind(this) }>
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
                  <Collapse in={open[index]}>
                        <div>
                            <Row className="text-center">
                                <Video controls ref="video">
                                    <source src={path+videoId} type="video/mp4" />
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