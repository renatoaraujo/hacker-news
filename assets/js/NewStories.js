import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Components/Item';

class NewStories extends React.Component {

    constructor() {
        super();

        this.state = {
            itemsKeys: [],
            loadedItems: [],
            index: 0
        };
    }

    loadTopStories() {
        fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
            .then(response => response.json())
            .then(itemsKeys => {
                this.setState({
                    itemsKeys
                });
                this.loadPaginatedItems();
            })
    };

    loadPaginatedItems() {
        let currentIndex = this.state.index;
        let nextIndex = this.state.index + 15;

        const chunk = this.state.itemsKeys.slice(currentIndex, nextIndex);

        {
            chunk.map(
                (itemId) => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
                        .then(response => response.json())
                        .then(item => {
                            this.setState(prevState => ({
                                loadedItems: [...prevState.loadedItems, item]
                            }))
                        })
                }
            )
        }

        this.setState({
            index: nextIndex
        })
    }

    componentDidMount() {
        this.loadTopStories();
    }

    render() {
        return (
            <div className="container cards">
                {this.state.loadedItems.map(
                    (item, index) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            index={index + 1}
                            title={item.title}
                            url={item.url}
                            score={item.score}
                            time={item.time}
                            descendants={item.descendants}
                            by={item.by}
                        >
                        </Item>
                    ))
                }
                <button type="button" className="btn btn-primary btn-lg btn-block flat"
                        onClick={this.loadTopStories.bind(this)}>
                    More
                </button>
            </div>
        );
    }
}

ReactDOM.render(<NewStories/>, document.getElementById('root'));
