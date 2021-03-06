import React, { useRef, useState, useEffect } from 'react';
import { Layout, PageHeader, Breadcrumb, Button } from 'antd';

import { Row, Col } from 'antd';
import '../App.css'
import { Input } from 'antd';
import { connect } from 'react-redux'
import { textBoxUpperChange, textBoxLowerChange, btnClicked, clear } from '../actions'
import store from '../store'
import { Tooltip } from 'antd';
import { CopyOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { notification, Divider } from 'antd';
import {
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    GithubOutlined,
    QuestionCircleOutlined,
  } from '@ant-design/icons';
  
import  InstructionModal  from './InstructionModal';
import Cookies from 'js-cookie';
import { Switch } from 'antd';
import { Typography } from 'antd';
const { TextArea } = Input;
const Context = React.createContext({ name: 'Default' });
const { Paragraph } = Typography;

var localState = {        
    inputUpper : "",
    inputLower : ""
};

const unsubscribe = store.subscribe( 
    () => {localState = (store.getState()); console.log(store.getState()); console.log(localState)}
    )



const HomePage = ({ dispatch, inputUpper, inputLower }) =>{

    
    const [instructionDialog, setInstructionDialog] = useState(false);
    const [textbox, setTextbox] = useState(true);
    const textAreaRef = useRef(null);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = text => {
        api.info({
            message: text,
        //   description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
            placement: 'topRight',
        });
        };


    useEffect(() => {

        if(!Cookies.get('showInstruction')){ //if this is first visit on a page
            Cookies.set('showInstruction', true);
            console.log("Pokaz instrukcje");
            setInstructionDialog(true);
        }
        }, []);

    const showInstructions = () => {
        setInstructionDialog(true);

    }
    const copyToClipboard = () => {
        
        let textToCopy = inputLower;
        if(textToCopy.length>0){
            const textField = document.createElement('textarea');
            textField.innerText = textToCopy;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand('copy');
            textField.remove();
            openNotification('Copied successfully');
        }
        else{
            openNotification('Nothing to copy!');
        }
        
      };
    const onChange = (e) => {
        setTextbox(e);
    }


    let LowerInput;
    if(textbox){
        LowerInput = (<Col flex={1}  >
        <div class = "textArea-wrapper" >
            
             <TextArea  onChange={(e) => dispatch(textBoxLowerChange(e.target.value))} 
                ref={textAreaRef}
                value = {inputLower}   
                autoSize={{ minRows: 5, maxRows: 15 }}
            />
            
        </div>
    </Col>)
    }
    else {
        LowerInput = (<Col flex={1}  >
            <div class = "textArea-wrapper" >
                {inputLower.split('\n').map((text) => 
                    <p><a href={text} target="_blank">
                        {text}
                    </a></p>
                )}
            </div>
        </Col>);
    }

    
    return(
    <Context.Provider value={{ name: 'Ant Design' }}> {contextHolder}
    <Row>
        <InstructionModal open = {instructionDialog} 
        setInstructionDialog = {setInstructionDialog}
        ></InstructionModal>
        <Col flex={1}   >
            <Row justify="center" >
                <Col flex={1} >
                    <PageHeader 
                        style = {{whiteSpace: 'nowrap'}}
                        title = "Aliexpress Link Fixer" 
                        // subTitle="Just paste ugly aliexpress link and get beautiful one! Works for links with garbage, referrals and trackers as well as links from app "
                        extra = {
                        <div >
                            
                            <QuestionCircleOutlined className = "icon" 
                            onClick = {showInstructions}/>
                            <a href = 'https://github.com/ogigg/AliexpressLinkExtractor' className = "icon"><GithubOutlined/></a>

                        </div>
                        }
                    >
                        <div style= {{whiteSpace: 'normal'}}>
                            Just paste ugly aliexpress link and get beautiful one! Works for links with garbage, referrals and trackers as well as links from app
                        </div>
                        
                        
                    </PageHeader>
                </Col>
                </Row>
                
                <Row>
                <Col flex={1} >
                    <div class = "textArea-wrapper">
                        <TextArea  value = {inputUpper} 
                        autoSize={{ minRows: 5, maxRows: 15 }}
                        onChange={ (e) => dispatch(textBoxUpperChange(e.target.value))}/>
                    </div> 
                </Col>
                </Row>

                <Row justify="center" align="middle">
                    {/* <Col span={15} > */}
                    <Col xs={{ span: 5, offset: 0 }} lg={{ span: 15 }} flex="auto">
                        <div class = "textArea-wrapper" >
                            <Button block type="primary" style = {{minWidth : '70px'}}
                            styles = {{whiteSpace: 'normal', wordWrap:' break-word'}} 
                            onClick = {e => handleClick()} >Fix it!</Button>
                        </div>
                    </Col>
                    {/* <Col span={3}> */}
                    <Col xs={{ span: 5, offset: 0 }} lg={{ span: 3 }} flex="auto">
                        <div class = "textArea-wrapper" >
                            <Button block  style = {{minWidth : '70px'}}
                            onClick = {e => {dispatch(clear()); console.log(store.getState()); }}>
                                Clear It!
                            </Button>
                        </div>
                    </Col>
                    {/* <Col span={3}> */}
                    <Col xs={{ span: 5, offset: 0 }} lg={{ span: 3 }} flex="auto">
                        <div class = "textArea-wrapper" >
                            <Button block style = {{minWidth : '70px'}}
                            onClick = {copyToClipboard}
                            >
                                Copy It!
                            </Button>
                        </div>
                    </Col>
                    {/* <Col span={3}> */}
                    <Col xs={{ span: 8, offset: 0 }} lg={{ span: 3 }} flex="auto">
                        <Row justify="space-around">
                            Clickable
                            <Switch defaultChecked onChange={onChange} /> 
                            Text
                        </Row>
                        
                    </Col>
                </Row>

                <Row>
                {LowerInput}
                
            </Row>
        </Col>
    </Row>
    </Context.Provider>
    );
    };

const fixLinks = (input) => {
    let regexp = /aliexpress\.com\/item\/\d+\.html/g;
    // var linksFoundArray = input.matchAll(regexp);
    let linksFoundArray = [...input.matchAll(regexp)];
    let fixedLinksArray = [];
    regexp = /.\.aliexpress\.com\/\_.+/g;
    let shareLinksFoundArray = [...input.matchAll(regexp)]; //share link looks like that https://a.aliexpress.com/_d9leh4R
    
    let returnedString = "";
    let shareLinksString = "";
    console.log(shareLinksFoundArray);
 
    linksFoundArray.map(link => {
        returnedString = returnedString + "https://www." + link[0] + '\n';
        fixedLinksArray.push("https://www." + link[0]);
        console.log(link[0]);
    })

    const promises = shareLinksFoundArray.map(async link => {
        const url = await getUrlFromSharedLink("https://cors-anywhere.herokuapp.com/https://"+ link);
        return url;
    })
    // console.log(promises)
    console.log(fixedLinksArray)
    
    promises.map(async promise => {
        const url = await promise;
        // console.log(url);
        fixedLinksArray.push("https://" + url)
        shareLinksString = shareLinksString + "https://" + url + '\n';
        store.dispatch(textBoxLowerChange(returnedString + shareLinksString));
        // returnedString=returnedString+'\n'+url;

    })
    return returnedString;
}


async function getUrlFromSharedLink(url) {
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
        } 
        return xhr;
    }
      
      // Helper method to parse the title tag from the response.
    function getUrl(text) {
        let regexp = /<meta property=.og:url. content=...(.*)?\?/g;
        return regexp.exec(text)[1]
    }
    return new Promise(function (resolve, reject) {      
        let xhr = createCORSRequest('GET', url);
        console.log('starting cors rq')
        // Response handlers.
        let desiredUrl = ''
        xhr.onload = function() {
            var text = xhr.responseText;
            desiredUrl = getUrl(text);
            console.log("Funkcja pytajaca: " + desiredUrl)
            resolve(desiredUrl);
            return desiredUrl
        };
        xhr.send();
    });
      
    //   return desiredUrl
}

const handleClick = () => {
    let inputUpper = store.getState().inputUpper;
    
    let inputLower = fixLinks(inputUpper);
    store.dispatch(textBoxLowerChange(inputLower));

    // store.dispatch(btnClicked()); console.log(store.getState());
    return "TEST";
  }


const mapStateToProps = state => {
    return {
        inputUpper : state.inputUpper,
        inputLower : state.inputLower
    }
  }

export default  connect(mapStateToProps)(HomePage)

