import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

  

  function RenderDish({dish}) {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
  function RenderComments({_comments}) {
    if (_comments != null) {
      const dishComments = _comments.map((comment) => {
        return (
          <div key={comment.id} className='mt-3 row'>
           <div className="col-12"> {comment.comment} </div>
            <br />
            <br />
           <div className="col-12"> -- {comment.author} ,{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
          </div>
        );
      });
      return dishComments;
    } else {
      return <div></div>;
    }
  }
  const  DishDetail = (props) => {
    if (props.dish == null) {
      return <div className='row'></div>;
    } else {
    }
    return (
      <div className="container">
        <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
      <div className='row'>
        <div className='col-12 col-md-5 m-1'><RenderDish dish={props.dish}/></div>
        <div className='col-12 col-md-5 m-1'>
          <h4>Comments</h4>
          <ul class='list-unstyled'><RenderComments _comments={props.comments}/></ul>
        </div>
      </div>
      </div>
    );
  }


export default DishDetail;