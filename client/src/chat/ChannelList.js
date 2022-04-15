import React from 'react';
import { Channel } from './Channel';

export function ChannelList(props) {

    const handleClick = id => {
        props.onSelectChannel(id);
    }

    // render() {
    console.log("wwwwhat")
    let list = <div className="no-content-message">There is no channels to show</div>;
    if (props.channels && props.channels.map) {
        list = props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={handleClick} />);
    }
    return (
        <div className='channel-list'>
            {list}
        </div>);
    // }

}