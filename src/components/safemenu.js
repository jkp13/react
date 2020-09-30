import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class Menu extends Component {

  constructor(props) {
      super(props);

      this.state = {
          selectedDish: null
      }
  }

  onDishSelect(dish) {
      this.setState({ selectedDish: dish});
  }

  renderDish(dish) {
      if (dish != null)
          return(
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
          );
      else
          return(
              <div></div>
          );
  }


  renderComments(dish) {
    if(dish != null) {
        console.log(dish.comments);
        const dishComments = dish.comments.map((comment) => {
          return (
            <div className="row">
              <div className="col-12 py-2">
              {comment.comment}
              </div>
              <div className="col-12 py-2">
              ---{comment.author},{new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
              </div>
            </div>
            
          
          
            
          );
        });

        

        return(
            <div>
                <h4>Comments</h4>
                {dishComments}
                
            </div>
        )
    
    } else {
        return(
            <div></div>
        )
    }
}

  render() {
      const menu = this.props.dishes.map((dish) => {
          return (
            <div  className="col-12 col-md-5 m-1">
              <Card key={dish.id}
                onClick={() => this.onDishSelect(dish)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
              </Card>
            </div>
          );
      });

      return (
          <div className="container">
              <div className="row">
                  {menu}
              </div>
              <div className="row">
                <div  className="col-12 col-md-5 m-1">
                  {this.renderDish(this.state.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                  {this.renderComments(this.state.selectedDish)}
                </div>
              </div>
          </div>
      );
  }
}


export default Menu;












2nd typecheck



menucomponent


import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import DishDetail from "./DishdetailComponent";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className='col-12 col-md-5 m-1'>
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width='100%' src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <div className='container'>
        <div className='row'>{menu}</div>
        <DishDetail dishdetails={this.state.selectedDish} />
      </div>
    );
  }
}

export default Menu;














dishdetialcomponent



import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderDish(dish) {
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
  renderComments(_comments) {
    if (_comments != null) {
      const dishComments = _comments.map((comment) => {
        return (
          <div key={comment.id} className='mt-3 row'>
           <div className="col-12"> {comment.comment} </div>
            <br />
            <br />
           <div className="col-12"> -- {comment.author} , {Date(comment.date).toString()}</div>
          </div>
        );
      });
      return dishComments;
    } else {
      return <div></div>;
    }
  }
  render() {
    if (this.props.dishdetails == null) {
      return <div className='row'></div>;
    } else {
    }
    return (
      <div className='row'>
        <div className='col-12 col-md-5 m-1'>{this.renderDish(this.props.dishdetails)}</div>
        <div className='col-12 col-md-5 m-1'>
          <h4>Comments</h4>
          <ul class='list-unstyled'>{this.renderComments(this.props.dishdetails.comments)}</ul>
        </div>
      </div>
    );
  }
}

export default DishDetail;