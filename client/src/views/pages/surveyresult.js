import React, { Component, Fragment } from "react";
import { Link,Redirect } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col, Button, Form, CustomInput, FormGroup, Label, Input } from "reactstrap";
import AuthService from '../../services/AuthService';
import "../../assets/scss/views/pages/survey/survey.css";
import {
   X,
   CheckSquare,
   User,
   Info,
   FileText,
   Mail
} from "react-feather";

import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import $ from "jquery";
window["$"] = window["jQuery"] = $;

function Follower() 
{ 
   // if(props.isfollwer)
 return <h1>Welcome User</h1>; 
  // console.log(props.isfollwer);
} 


class surveyresult extends Component {


   
   constructor(props) {
      super(props);
      let userList = JSON.parse(localStorage.getItem("userData"));
      this.state = {
         isfollwer : [], 
        dataList: [],
        userList:[],
        issurvey:null,
        shirtmore:[],
        redirectToReferrer: false,
        name:userList.name,
        surname:userList.surname,
        position:userList.position,
        userid:userList.id
      };
      this.Auth = new AuthService();
    }

    componentWillMount() {
      console.log('componentwillount');
      let chk = this.Auth.loggedIn();
      console.log(chk);
      if (this.Auth.loggedIn()) {
        
         this.setState({redirectToReferrer: true});
         // return (<Redirect to={'user-profile'}/>)
         }else{
            return (<Redirect to={'login'}/>)
           // this.setState({redirectToReferrer: false});
         }
     
   

     }

    componentDidMount() {
      console.log('componentdinmount');
      $.ajax({
         method:'get',
         crossDomain: true,
         url: "http://164.115.17.163:8082/v1/survey/answers/"+ localStorage.getItem("session_userid")+ "/seminar-01/1"
     }).done((res) => {
      console.log(res.data);
         if(res.data){
            this.setState({
                  dataList:res.data.surveyresult,
                  isfollwer:res.data.surveyresult.detailfollower,
                  shirtmore:res.data.surveyresult.items,
                  issurvey:true
            });
         }else{
            this.setState({
               issurvey:false
            
         });
         }
       console.log(this.state.isfollwer);
      //  console.log(this.state.dataList);
      //    console.log(this.state.shirtmore);

     })

    
    }
    renderUser(_render) {

      switch(_render){
         case "readytogo":

        
            if(this.state.dataList.readytogo === 'Yes')
               return<div>ไป</div>;
            else
               return<div>ไม่ไป</div>;
          
          break;
         case "howtogo":
            if(this.state.dataList.readytogo === '1')
                  return<div>รถบัส</div>;
            
               else
                  return<div>ขับรถไปเอง</div>;

            break;
         case "typeofsleep":
            if(this.state.dataList.typeofsleep === 'roommate')
                  return<div>นอนคู่</div>;
            
            if(this.state.dataList.typeofsleep === 'family')
                  return<div>นอนกับครอบครัว</div>; 
               else
                  return<div>แล้วแต่ทีมงานจัดเลย</div>;

            break;
         case "food":
            if(this.state.dataList.food === '1')
                  return<div>ทานได้ทุกอย่าง</div>;
            
            if(this.state.dataList.typeofsleep === '2')
                  return<div>ฮาลาล</div>; 
               else
                  return<div>มังสวิรัติ</div>;

            break;
         case "follower":
            if(this.state.dataList.follower === 'Yes')
                  return<div>มีผู้ติดตาม</div>;
            
            if(this.state.dataList.follower === 'No')
                  return<div>ไม่มีผู้ติดตาม</div>; 
            break;
         case "datetoback":
            if(this.state.dataList.datetoback === '1')
                  return<div>01 พฤศจิกายน 2562</div>;
            
            if(this.state.dataList.datetoback === '2')
                  return<div>02 พฤศจิกายน 2562</div>; 
            if(this.state.dataList.datetoback === '3')
                  return<div>03 พฤศจิกายน 2562</div>;
            break;
         case "datetogo":
            if(this.state.dataList.datetogo === '1')
                  return<div>01 พฤศจิกายน 2562</div>;
            
            if(this.state.dataList.datetogo === '2')
                  return<div>02 พฤศจิกายน 2562</div>; 
            if(this.state.dataList.datetogo === '3')
                  return<div>03 พฤศจิกายน 2562</div>;
            break;



            
            default:
            return null;
         }
        
         
      }
   
        
        

      // if (!this.state.dataList.readytogo) return;
      //    if (this.state.dataList.readytogo === 'Yes') {
      //      return<div>ไป</div>;
      //    }
      //    if (this.state.dataList.readytogo === 'No') {
      //       return<div>ไม่ไป</div>;
      //     }
      //     if (this.state.dataList.howtogo === 'รถบัส') {
      //       return<div>ไป</div>;
      //     }
      //     if (this.state.dataList.howtogo === 'ขับรถไปเอง') {
      //        return<div>ไม่ไป</div>;
      //      }
      //    return null
      Follwer(state,value) {
         console.log(state);
         console.log(value);
         console.log('Notification');
         return (
          
             (function() {
               switch(state) {
                 case 'follwer_food':
                  if(value === '1'){
                     return '/ ทานได้ทุกอย่าง';
                  }
                  if(value === '2'){
                     return '/ อาหารฮาลาล';
                  }
                  if(value === '3'){
                     return '/ อาหารมังสวิรัติ';
                  }
                  break;
                 case 'follwermakeinsurance':
                   return<div>wwwwไป</div>;
                   break;
                 default:
                   return null;
               }
             })
           
         );
       }
      renderView() {
         if(this.state.dataList.follower === "No") {
           return <div></div>
         } else  {
            const items = this.state.isfollwer.map((item, key) =>
                   <li key={key.toString()}>
                  <div>ผู้ติดตามคนที่ {key + 1}</div>
                  <div><b>ชื่อ - สกุล :</b>{item.follwer_name} / บัตรประจำตัวประชน : {item.follwerid} / อายุ  {item.follwer_age}</div>
                  
                  <div> {item.follwer_jointoeat === '1'? 'ทานอาหารด้วย':'ไม่ทานอาหาร'} {this.Follwer('follwer_food',item.follwer_food)} </div>
                  <div> {item.follwermakeinsurance === '1'? 'ทำประกัน':'ไม่ทำประกัน'} {item.follwermakeinsurance === '1'? '/ ผู้รับผลประโยชน์กรมธรรม์ :' + item.follwer_insurance + '/ มีความสัมพันธ์เป็น : '+ item.follwer_insurance_relation:''}</div>
                  <div>  โรคประจำตัว : {item.follower_disease === ''? '-':item.follower_disease}</div>
                  </li>
            

         
            );
            return <ul>{items}</ul>
         } 
       }
       Moreshirt() {
         if(this.state.dataList.shirt_add_more === "No") {
           return <div>ไม่สั่งเสื้อเพิ่ม</div>
         } else  {
          
            const items_shirt = this.state.shirtmore.map((item, key) =>
                   <li key={key.toString()}>
                  <div>เสื้อตัวที่ {key + 1}</div>
                  <div><b>ไซส์ :</b>{item.shirt_more} / จำนวน : {item.quantity_shirt} / ราคา  {item.total}</div>
                  
                 
                  </li>
            

         
            );
            return <ul>{items_shirt}</ul>
         } 
       }
      renderSurvey(){
         if(this.state.issurvey) {
         
        let input 
        return input = 
        <div>
            <FormGroup row>
            <Label  className = "summary_result_lable" sm={3}>ไปร่วมงานสัมมนากับเรา </Label>
            <Col sm={9}>
            {this.renderUser("readytogo")}
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}>เลือกการเดินทาง :</Label>
            <Col sm={9}>
            {this.renderUser("howtogo")}
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}>ร่วมสัมมนาตั้งแต่วันที่ - ถึงวันที่</Label>
            <Col sm={9}>
            {this.renderUser("datetogo")}-{this.renderUser("datetoback")}
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}>เลือกประเภทการนอน</Label>
            <Col sm={9}>
            {this.renderUser("typeofsleep")}
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}> เลือก roomate เป็น</Label>
            <Col sm={9}>
            {this.state.dataList.partner}
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label className = "summary_result_lable"  sm={3}>ประเภทอาหาร</Label>
            <Col sm={9}>
            {this.renderUser("food")}
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}> โรคประจำตัว/แพ้อาหาร</Label>
            <Col sm={9}>
            {this.state.dataList.follower_disease}
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label  className = "summary_result_lable" sm={3}> ผู้รับผลประโยชน์กรมธรรม์</Label>
            <Col sm={9}>
            {this.state.dataList.insurance_benefit} /โทร:  {this.state.dataList.employee_contact} /มีความสัมพันธ์เป็น:  {this.state.dataList.insurance_benefit_relation}
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}> ผู้ติดตาม</Label>
            <Col sm={9}>
            {this.renderUser("follower")}
             <div>{this.renderView()}</div>

           
            </Col>
         </FormGroup>
         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}> สั่งเสื้อสัมมนา</Label>
            <Col sm={9}>
           ไซส์เสื้อ   {this.state.dataList.shirt}
           

           
            </Col>
         </FormGroup>

         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}> สั่งเสื้อสัมมนาเพิ่ม</Label>
            <Col sm={9}>
            <div>{this.Moreshirt()}</div>
           

           
            </Col>
         </FormGroup>

         <FormGroup row>
            <Label  className = "summary_result_lable"  sm={3}> ค่าใช้จ่ายทั้งหมด</Label>
            <Col sm={9}>
            {parseInt(this.state.dataList.totalQuantity)} +  {parseInt(this.state.dataList.totalCost)}  THB.
            </Col>
         </FormGroup>
      </div>
         }else{
            return <div>ยังไม่ได้ทำแบบสำรวจ</div>
         }

       }

   render() {
      
      
      return (

         <Fragment>
           
           
            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                       
                          <div className="px-3">						
                           <Form className="form-bordered form-horizontal">
                              <div className="form-body">
                                 <h4 className="form-section"><Info size={20} color="#212529" />ข้อมูลส่วนบุคคล</h4>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup row>
                                          <Label for="userinput1" sm={3}>ชื่อ สกุล:</Label>
                                          <Col sm={9}>
                                          {this.state.name} {this.state.surname}
                                          </Col>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup row>
                                          <Label for="userinput2" sm={3}>รหัส:</Label>
                                          <Col sm={9}>
                                          {this.state.userid}
                                          </Col>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup row className="last">
                                          <Label for="userinput3" sm={3}>ตำแหน่ง:</Label>
                                          <Col sm={9}>
                                          {this.state.position}
                                          </Col>
                                       </FormGroup>
                                    </Col>
                                    {/* <Col md="6">
                                       <FormGroup row className="last">
                                          <Label for="userinput4" sm={3}>Nick Name:</Label>
                                          <Col sm={9}>
                                             <Input type="text" id="userinput4" className="border-primary"  name="nickname"/>
                                          </Col>
                                       </FormGroup>
                                    </Col> */}
                                 </Row>

                                
                                 <h4 className="form-section"><Mail size={20} color="#212529" /> รายละเอียดงานสัมมนา</h4>

                              
                              {this.renderSurvey()}
                                
                              </div>
                              
                              <div className="form-actions right">
                                 {/* <Button color="warning" className="mr-1"  component={ Redirect } to="/survey" >
                                    <X size={16} color="#FFF" /> แก้ไข
                                 </Button> */}
                                 <Link to="/pages/survey">
                                 <Button color="warning" className="mr-1">
                                 <X size={16} color="#FFF" /> แก้ไข
                                 </Button>
                              </Link>
                              </div>
                           </Form>

                        </div>

                        
                     </CardBody>
                  </Card>
               </Col>
            </Row>

         
         </Fragment>
      );
    
   }
}

export default surveyresult;