import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { get, find } from 'lodash/fp';

class CategoryColors extends Component {
  constructor(props) {
    super(props);
    const { color } = props;

    this.state = { open: false, color };
  }

  renderColorList(colors) {
    return colors.map(color => (
      <li
        role="presentation"
        onClick={() => this.setState({ color })}
        style={{ backgroundColor: color }}
      />
    ));
  }

  render() {
    const colors = [
      '#ffc2b3',
      '#ffb3b3',
      '#ffb3d9',
      '#f0c2e0',
      '#ffb3ff',
      '#d9b3ff',
      '#c2c2f0',
      '#b3b3ff',
      '#b3d9ff',
      '#b3e6ff',
      '#b3ffff',
      '#b3ffd9',
      '#b3ffcc',
      '#e6ffb3',
      '#ffffb3',
      '#ffe0b3',
    ];

    const { open, color } = this.state;
    const { translate } = this.props;

    return (
      <label htmlFor="color">
        <span>{translate('edit.color')}:</span>
        <select
          type="button"
          id="color"
          name="color"
          onClick={() => this.setState({ open: !open })}
          style={{ backgroundColor: color }}
        >
          <option value={color}>{translate('edit.selectColor')}</option>
        </select>
        {open ? (
          <ul className="color-list">{this.renderColorList(colors)}</ul>
        ) : null}
      </label>
    );
  }
}

CategoryColors.defaultProps = {
  color: '#d9d9d9',
};

CategoryColors.propTypes = {
  color: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  color: get('color', find({ id }, state.categories)),
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(CategoryColors);
