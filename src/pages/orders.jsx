import { Button, Table } from "reactstrap";

import { AppCard } from "../components/AppCard";
import { Link } from "react-router-dom";
import uniqueId from "lodash/uniqueId";
import { useData } from "../hooks/useData";
import { useState } from "react";

export const Orders = () => {
  const { data, loading } = useData(
    `/v1/orders?user_id=${localStorage.getItem("user_id")}`,
    "orders"
  );
  const [orderDetails, setOrderDetails] = useState(null);

  const onOrderDetailsClick = (e) => {
    setOrderDetails(
      data.find((item) => item._id === e.currentTarget.dataset.id).items
    );
  };

  return (
    <AppCard title="Orders">
      <div style={{ float: "right" }}>
        <Link to="/orders/create">
          <Button color="primary">New Order</Button>
        </Link>
      </div>
      <Table striped title="Products">
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Total Items</th>
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
                <td>{item.total}</td>
                <td>{item.status}</td>
                <td>{item.items.length}</td>
                <td>
                  <div>
                    <span
                      data-id={item._id}
                      onClick={onOrderDetailsClick}
                      style={{
                        textDecoration: "underline",
                        color: "#00f",
                        cursor: "pointer",
                      }}
                    >
                      Order Details
                    </span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {Array.isArray(orderDetails) ? (
        <AppCard
          title={
            <div>
              <span>Order Details</span>
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "0.5rem",
                  fontSize: "1.2rem",
                  color: "#f00",
                  cursor: "pointer",
                }}
                onClick={() => setOrderDetails(null)}
              >
                &times;
              </span>
            </div>
          }
        >
          <Table responsive>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>In Offer</th>
                <th>Actual Price</th>
                <th>Discount</th>
                <th>Tax</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item) => (
                <tr key={uniqueId()}>
                  <td>{item.item_id}</td>
                  <td>{item.offer_id ? "Yes" : "No"}</td>
                  <td>{item.actual_price}</td>
                  <td>{item.discount}</td>
                  <td>{item.tax}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </AppCard>
      ) : null}
    </AppCard>
  );
};
