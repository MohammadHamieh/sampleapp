/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

class SearchBar extends PureComponent {
  render() {
    return (
      <form>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search" />
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit">
              <i className="glyphicon glyphicon-search" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default SearchBar;
