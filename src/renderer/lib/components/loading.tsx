import React, { useState, useEffect } from 'react';

const Loading = (props: LoadingProps): JSX.Element => {
    const [ statusText, setStatusText ] = useState('loading...');
    useEffect (() => {
        const LIMIT = 10;
        let count = 0;

        const interval = setInterval(() => {
            count++;

            if (count >= LIMIT) {
                props.completeLoad();
                clearInterval(interval);
            }

            console.log(count);
        }, 1000);
    });

    return <div className="loading">
        <div className='loading-animation'>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        <div className='status-text'>
            {statusText}
        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"/>
        <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"></script>
    </div>
}

interface LoadingProps {
    completeLoad (): void
}

export default Loading;