import React from 'react';
import './card.scss';
import { listData } from '../../lib/dummy';

const Card = () => {

    const data = listData;

    console.log(data);

    return (
        <div>
            card
        </div>
    );
};

export default Card;