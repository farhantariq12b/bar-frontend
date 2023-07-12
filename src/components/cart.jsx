import { Table } from "reactstrap";
import { uniqueId } from "lodash";

export const Cart = ({ items, onRemove, products }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Item Id</th>
          <th>Item Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={uniqueId()}>
            <td>{item.id}</td>
            <td>{products.find((prod) => prod._id === item.id).name}</td>
            <td>
              <div>
                <span data-index={idx} onClick={onRemove}>
                  Remove
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
