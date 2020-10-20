import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const Snackbar = ({ isLoggedIn, translate}) => (
  <div>
    {!isLoggedIn && (
      <div id="unauthenticated">
        {translate('snackbar.unauthenticated')}
      </div>
    )}
  </div>
);
Snackbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.email,
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(Snackbar);
