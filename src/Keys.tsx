import React, { useState } from 'react';
import { IItem } from './index';

function KeyItem(props: { item: IItem }) {
    const [isChanging, setChanging] = useState(false);
    const [prevValue, setPrevValue] = useState(props.item.name);
    const inputRef = React.useRef<HTMLInputElement>(null);

    function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
        console.log(event.key);
        if (event.key === 'Enter') {
            setPrevValue(inputRef.current?.value || '');
            setChanging(false);
        }
        if (event.key === 'Escape') {
            console.log('pressed!');
            setChanging(false);
        }
    }

    if (!isChanging) {
        return <li onClick={() => setChanging(true)}>{prevValue}</li>;
    } else {
        return (
            <li key={props.item.id}>
                <input
                    ref={inputRef}
                    onKeyDown={onKeyDownHandler}
                    type="text"
                    defaultValue={prevValue}
                />
            </li>
        );
    }
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    let collection = props.initialData.sort((a, b) => a.id - b.id);
    if (props.sorting === 'DESC') collection = collection.reverse();
    return (
        <ul>
            {collection.map((item) => (
                <KeyItem key={item.id} item={item} />
            ))}
        </ul>
    );
}
