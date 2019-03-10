import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Components/Item';
import Comment from "./Components/Comment";

class Comments extends React.Component {

    constructor() {
        super();

        this.state = {
            story: {},
            comments: [],
        };
    }

    loadStory() {
        const root = document.querySelector('#root');
        fetch(`https://hacker-news.firebaseio.com/v0/item/${root.dataset.storyid}.json`)
            .then(response => response.json())
            .then(story => {
                this.setState({
                    story
                });
                this.loadComments(story.kids);
            })
    }

    loadComments(commentsIds) {
        {
            commentsIds.map(
                (itemId) => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
                        .then(response => response.json())
                        .then(comment => {
                            this.setState(prevState => ({
                                comments: [...prevState.comments, comment]
                            }))
                        })
                }
            )
        }
    }

    componentDidMount() {
        this.loadStory();
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron jumbotron-fluid">
                    <h3 className="display-4">{this.state.story.title}</h3>
                </div>
                <div className="row">
                    <div className="comments" id="comments">
                        {this.state.comments.map(
                            (comment) => (
                                <Comment key={comment.id} comment={comment} />
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Comments/>, document.getElementById('root'));
