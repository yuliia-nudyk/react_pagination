// #region imports
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
// #endregion

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const totalItems = 42;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 5);

  const startFrom = perPage * (page - 1);
  const visibleItems = [...items].splice(startFrom, perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startFrom + 1} - ${startFrom + perPage} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setSearchParams({
                perPage: e.target.value,
                page: '1',
              });
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination total={totalItems} />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
