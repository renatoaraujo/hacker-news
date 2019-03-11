import React from 'react';
import extractDomain from 'extract-domain';
import moment from 'moment';
import pluralize from 'pluralize';

const Item = ({id, index, title, url, score, time, descendants, by}) => (
    <div key={id} className="card flat">
        <div className="card-body">
            <p className="item-title">
                <span className="index-rank">{index}.</span>
                <a className="text-primary" href={url} target="_blank">
                    {title}&nbsp;
                </a>
                {undefined !== url && (<small className="item-subtitle">({extractDomain(url)}) </small>)}
            </p>
            <p className="item-subtitle">
                <small>
                    {score} points by {by} {moment.unix(time).fromNow()} <a
                    href={"comments/" + id}> {pluralize('comment', descendants, true)}
                </a>
                </small>
            </p>
        </div>
    </div>
);

export default Item;
