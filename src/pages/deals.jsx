import { Button, Table } from "reactstrap";

import { AppCard } from "../components/AppCard";
import { Link } from "react-router-dom";
import uniqueId from "lodash/uniqueId";
import { useData } from "../hooks/useData";

export const Deals = () => {
  const { data, loading, onDelete } = useData("/v1/deals", "deals");
  return (
    <AppCard title="Products">
      <div style={{ float: "right" }}>
        <Link to="/deals/create">
          <Button color="primary" style={{ marginLeft: "0.5rem" }}>
            Make a Deal
          </Button>
        </Link>
      </div>
      <Table striped title="Products">
        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Discounted Item</th>
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
                <td>{item?.item?.name ?? "Deleted"}</td>
                <td>{item?.addon?.name ?? "Deleted"}</td>
                <td>{item.discount}</td>
                <td>{item.discount_type}</td>
                <td>{item.max_discount_cap}</td>
                <td>
                  <div>
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
