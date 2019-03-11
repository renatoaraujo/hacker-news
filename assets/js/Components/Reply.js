import React from 'react';
import DOMpurify from 'dompurify';
import moment from 'moment';

const sanitizer = DOMpurify.sanitize;

class Reply extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reply: {},
            replies: []
        };
    }

    componentDidMount() {
        this.props.replies.map(
            (replyId) => {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${replyId}.json`)
                    .then(response => response.json())
                    .then(reply => {
                        if (undefined === reply.deleted) {
                            this.setState(prevState => ({
                                replies: [...prevState.replies, reply]
                            }))
                        }
                    })
            }
        )
    }

    render() {
        return (
            <div className="comment-reply col-md-12 offset-md-1 col-sm-10 offset-sm-2">
                {this.state.replies.map(
                    (reply) => (
                        <div key={reply.id} className="row">
                            <div className="comment-content col-md-11 col-sm-10 col-12">
                                <h6 className="small comment-meta">
                                    <a href="#">{reply.by}</a> about {moment.unix(reply.time).fromNow()}
                                </h6>
                                <div className="comment-body"
                                     dangerouslySetInnerHTML={{__html: sanitizer(reply.text)}}/>
                                <hr/>
                            </div>
                            {undefined !== reply.kids && (<Reply replies={reply.kids}/>)}
                        </div>
                    )
                )}
            </div>
        )
    }
}

export default Reply;
