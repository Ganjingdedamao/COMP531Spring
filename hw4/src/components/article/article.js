import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


const Article =({id, text, date, img, comments,author})=> {
	return img!=""?
           (<div className="col-xs-12 col-lg-12  col-sm-12 col-md-12 margin_5 border_bottom" >
			       <article >
                <div className="col-xs-3 col-lg-3 col-sm-3 col-md-3" >
                <div className="thumbnail margin_top_10" >
                  <img data-src="holder.js/100%x180" className="img-responsive" src={img} alt="..."/>
                </div>
                </div>
                <div className="col-xs-9 col-lg-9 col-sm-9 col-md-9" >
                  <h4>{author}</h4>
                  <h5>{text}</h5>
                  <h6 className="float_left"><span className="glyphicon glyphicon-copyright-mark"></span>{date}</h6>
                  <a className="btn btn-default float_right margin_5" href="#" role="button">Edit <span className="glyphicon glyphicon-pencil"></span></a>
                  <a className="btn btn-default float_right margin_5" href="#" role="button">Comment <span className="glyphicon glyphicon-comment"></span></a> 
                </div>
              </article>
            </div>
            ):(
            <div className="col-xs-12 col-lg-12  col-sm-12 col-md-12 margin_5 border_bottom" >
             <article >
                
                <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12" >
                  <h4>{author}</h4>
                  <h5>{text}</h5>
                  <h6 className="float_left"><span className="glyphicon glyphicon-copyright-mark"></span>{date}</h6>
                  <a className="btn btn-default float_right margin_5" href="#" role="button">Edit <span className="glyphicon glyphicon-pencil"></span></a>
                  <a className="btn btn-default float_right margin_5" href="#" role="button">Comment <span className="glyphicon glyphicon-comment"></span></a> 
                </div>
              </article>
            </div>
            )



		
	
}
export default Article