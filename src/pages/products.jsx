import { Button, Table } from "reactstrap";

import { AppCard } from "../components/AppCard";
import { Link } from "react-router-dom";
import uniqueId from "lodash/uniqueId";
import { useData } from "../hooks/useData";

export const Products = () => {
  const { data, onDelete, loading } = useData("/v1/products", "products");
  return (
    <AppCard title="Products">
      <div style={{ float: "right" }}>
        <Link to="/products/create">
          <Button color="primary">Create New</Button>
        </Link>
      </div>
      <Table striped title="Products">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Discount</th>
            <th>Discount Type</th>
            <th>Discount Cap</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={999}>Loading...</td>
            </tr>
          ) : (
            data?.map((item) => (
              <tr key={uniqueId()}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.tax}</td>
                <td>{item.discount}</td>
                <td>{item.discount_type}</td>
                <td>{item.max_discount_cap}</td>
                <td>
                  <div>
                    <Link to="/" style={{ marginRight: "0.5rem" }}>
                      Edit
                    </Link>
                    <Link to="/" data-id={item._id} onClick={onDelete}>
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </AppCard>
  );
};
