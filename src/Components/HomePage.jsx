import React from 'react';
import { Layout, PageHeader, Breadcrumb, Button } from 'antd';
import { Row, Col } from 'antd';
import '../App.css'
import { Input } from 'antd';
import { connect } from 'react-redux'
import { textBoxUpperChange, textBoxLowerChange, btnClicked } from '../actions'
import store from '../store'

const { TextArea } = Input;

var localState = {        
    inputUpper : "",
    inputLower : ""
};
// const inputLower = "";
const unsubscribe = store.subscribe(
    () => {localState = (store.getState()); console.log(store.getState()); console.log(localState)}
    )

const HomePage = ({ dispatch, localState }) =>(
    <Row>
    <Col flex={1}  class = "test" >
    <Row justify="center" >
      <Col flex={1} >
        <PageHeader title = "Aliexpress Link Fixer" />
      </Col>
    </Row>
    
    <Row>
      <Col flex={1} >
        <div class = "textArea-wrapper" >
        {/* value = {store.getState()} */}
            <TextArea  onChange={ (e) => dispatch(textBoxUpperChange(e.target.value))}/>
        </div>
      </Col>
    </Row>

    <Row justify="center">
      <Col flex={1} >
        <div class = "textArea-wrapper" >
            <Button block type="primary" 
            onClick = {e => {dispatch(btnClicked()); console.log(store.getState()); }
        }>Fix it!</Button>
        </div>
      </Col>
    </Row>

    <Row>
      <Col flex={1}  >
        <div class = "textArea-wrapper" >
        {/* value = {localState.inputLower} */}
            <TextArea  onChange={(e) => dispatch(textBoxLowerChange(e.target.value))} 
            value = {store.getState().inputLower} />
        </div>
      </Col>
    </Row>
    </Col>
    </Row>
);

const mapStateToProps = state => {
    return {
        inputUpper : state.inputUpper,
        inputLower : state.inputLower,
    }
  }

export default  connect(mapStateToProps)(HomePage)

