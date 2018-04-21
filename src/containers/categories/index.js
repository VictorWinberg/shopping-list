import React from 'react';
// import PropTypes from 'prop-types';

import CategoryList from './CategoryList';
import New from '../common/New';
import { addCategory } from '../../actions/categories';

const Categories = () => (
  <div>
    <New view="categories" onAdd={addCategory}/>
    <CategoryList />
  </div>
);

export default Categories;