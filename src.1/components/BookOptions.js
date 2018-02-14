import React, { Component } from 'react';


export default class BookOptions extends Component {

    render() {
        const { menu } = this.props;
        let id = 1;
        return (
            <div className="book-shelf-changer">
            <select name="meni-options">
                {menu && menu.map((item) => 
                    <option key={id++}  value={item.value} disabled={item.disable}>
                        {item.title}
                    </option>
                )}
            </select>
        </div>
        )
    }
}
