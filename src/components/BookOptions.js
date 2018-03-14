import React, { Component } from 'react';

const menuOptions = [
    {
      value: "none", 
      disable: "disabled",
      title: "Move to...",
    },
    {
      value: "currentlyReading", 
      disable: "",
      title: "Currently Reading"
    },
    {
      value: "wantToRead", 
      disable: "",
      title: "Want to Read",
    },
    {
      value: "read", 
      disable: "",
      title: "Read",
    },
    {
      value: "None", 
      disable: "",
      title: "None",
    }
  ]


export default class BookOptions extends Component {
    render() {
        const {update, book, sel } = this.props;
        return (
            <div className="book-shelf-changer">
            <select name="meni-options" defaultValue={sel} onChange={(event) => update(book, event.target.value)}>
                {menuOptions && menuOptions.map((item) => 
                    <option key={item.value}  value={item.value} disabled={item.disable}>
                        {item.title}
                    </option>
                )}
            </select>
        </div>
        )
    }
}
