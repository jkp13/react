import React, { Component } from 'react';
import {
   Card,
   CardImg,
   CardBody,
   CardText,
   CardTitle,
   Breadcrumb,
   BreadcrumbItem,
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   Label,
   Col,
   Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isModalOpen: false,
      };

      this.toggleModal = this.toggleModal.bind(this);
   }

   toggleModal() {
      this.setState({
         isModalOpen: !this.state.isModalOpen,
      });
   }

   handleSubmit(values) {
      console.log('Current state is ' + JSON.stringify(values));
      alert('Current state is ' + JSON.stringify(values));
      this.toggleModal();
   }

   render() {
      return (
         <React.Fragment>
            <Button outline onClick={this.toggleModal}>
               <span className="fa fa-pencil"></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
               <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                     <Row className="form-group">
                        <Col md={12}>
                           <Label htmlFor="rating">Rating</Label>
                        </Col>
                        <Col md={12}>
                           <Control.select
                              model=".rating"
                              id="rating"
                              name="rating"
                              className="form-control">
                              <option> </option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                           </Control.select>
                        </Col>
                     </Row>
                     <Row className="form-group">
                        <Col md={12}>
                           <Label htmlFor="lastname">Your Name</Label>
                        </Col>

                        <Col md={12}>
                           <Control.text
                              model=".lastname"
                              id="lastname"
                              name="lastname"
                              placeholder="Last Name"
                              className="form-control"
                              validators={{
                                 required,
                                 minLength: minLength(3),
                                 maxLength: maxLength(15),
                              }}
                           />
                           <Errors
                              className="text-danger"
                              model=".lastname"
                              show="touched"
                              messages={{
                                 required: 'Required: ',
                                 minLength: 'Must be greater or eaqual to 3 characters',
                                 maxLength: 'Must be 15 characters or less',
                              }}
                           />
                        </Col>
                     </Row>

                     <Row className="form-group">
                        <Col md={12}>
                           <Label htmlfor="comment">Comment</Label>
                        </Col>
                        <Col md={12}>
                           <Control.textarea
                              model=".comment"
                              id="comment"
                              name="comment"
                              className="form-control"
                              rows="6"
                           />
                        </Col>
                     </Row>

                     <Row className="form-group">
                        <Col md={12}>
                           <Button type="submit" color="primary">
                              Submit
                           </Button>
                        </Col>
                     </Row>
                  </LocalForm>
               </ModalBody>
            </Modal>
         </React.Fragment>
      );
   }
}

function RenderDish({ dish }) {
   if (dish) {
      return (
         <div className="col-12 col-md-5 m-1">
            <Card>
               <CardImg width="100%" height="400px" src={dish.image} alt={dish.name} />
               <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
               </CardBody>
            </Card>
         </div>
      );
   } else {
      return <div></div>;
   }
}

function RenderComments(comments) {
   if (comments != null) {
      const comment = comments.dish.map((cmt) => {
         return (
            <li key={cmt.id} className="mt-3">
               {cmt.comment}, <br /> <br />
               -- {cmt.author},{' '}
               {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
               }).format(new Date(Date.parse(cmt.date)))}
            </li>
         );
      });
      return (
         <div className="col-12 col-md-4 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">{comment}</ul>
            <CommentForm />
         </div>
      );
   } else {
      return <div></div>;
   }
}

function DishDetail(props) {
   const comments = props.comments;
   return (
      <div className="container">
         <div className="row">
            <Breadcrumb>
               <BreadcrumbItem>
                  <Link to="/menu">Menu</Link>
               </BreadcrumbItem>
               <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>

            <div className="col-12">
               <h3>{props.dish.name}</h3>
               <hr />
            </div>
         </div>
         <div className="row">
            <RenderDish dish={props.dish} />
            <RenderComments dish={comments} />
         </div>
      </div>
   );
}

export default DishDetail;