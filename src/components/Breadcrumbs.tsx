import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  href: string;
  label: string;
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }): JSX.Element => (
  <nav aria-label="Breadcrumb" className="breadcrumbs">
    {items.map((item, index) => (
      <span key={item.href}>
        {index > 0 ? <span className="breadcrumbs-separator">/</span> : null}
        {index === items.length - 1 ? (
          <span aria-current="page">{item.label}</span>
        ) : (
          <Link to={item.href}>{item.label}</Link>
        )}
      </span>
    ))}
  </nav>
);
