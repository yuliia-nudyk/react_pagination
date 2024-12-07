import cn from 'classnames';
import { useSearchParams, Link } from 'react-router-dom';

type Props = {
  total: number;
};

export const Pagination = ({ total }: Props) => {
  const [searchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 5);

  const pagesQuantity = Math.ceil(total / perPage);
  const pagesNumbers = [];

  for (let i = 1; i <= pagesQuantity; i++) {
    pagesNumbers.push(i);
  }

  const getNewPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', newPage.toString());

    return newParams.toString();
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: page === 1,
        })}
      >
        <Link
          to={{
            search: getNewPage(page - 1),
          }}
          data-cy="prevLink"
          className="page-link"
          aria-disabled={page === 1}
        >
          «
        </Link>
      </li>

      {pagesNumbers.map(pageNumber => (
        <li
          className={cn('page-item', {
            active: pageNumber === page,
          })}
          key={pageNumber}
        >
          <Link
            to={{
              search: getNewPage(pageNumber),
            }}
            data-cy="pageLink"
            className="page-link"
          >
            {pageNumber}
          </Link>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: page === pagesQuantity,
        })}
      >
        <Link
          to={{
            search: getNewPage(page + 1),
          }}
          data-cy="nextLink"
          className="page-link"
          aria-disabled={page === pagesQuantity}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
