import React from 'react';
import DOMpurify from 'dompurify';
import Reply from './Reply';

const moment = require('moment');
const sanitizer = DOMpurify.sanitize;

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comment row">
                <div className="comment-content">
                    <h6 className="small comment-meta">
                        <a href="#">{this.props.comment.by}</a> about {moment.unix(this.props.comment.time).fromNow()}
                    </h6>
                    <div className="comment-body"
                         dangerouslySetInnerHTML={{__html: sanitizer(this.props.comment.text)}}/>
                    <hr/>
                </div>
                {undefined !== this.props.comment.kids && (<Reply replies={this.props.comment.kids}/>)}
            </div>
        );
    }
}

export default Comment;
