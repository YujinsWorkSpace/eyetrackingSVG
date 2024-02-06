import React from 'react';

const DropDownMenu = ({ onSelect, selected }) => {

    const handleClick = (item) => {
        onSelect(item);
    }

    return (
        <div className='flex flex-col dropDownProfile'>
            <ul className='flex flex-col gap-4'>
                <li className={selected === 'Default' ? 'selected' : ''} onClick={() => handleClick('Default')}>Default</li>
                <li className={selected === 'Window' ? 'selected' : ''} onClick={() => handleClick('Window')}>Window</li>
                <li className={selected === 'Pan' ? 'selected' : ''} onClick={() => handleClick('Pan')}>Pan</li>
            </ul>
        </div>
    );
}

export default DropDownMenu;
