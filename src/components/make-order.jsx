import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { useCallback, useState } from "react";

import { AppCard } from "./AppCard";
import { Cart } from "./cart";
import { api } from "../services/api";
import { getUserIdFromLocalStorage } from "../helpers/localStorage";
import { toast } from "react-hot-toast";
import uniqueId from "lodash/uniqueId";
import { useData } from "../hooks/useData";
import { useNavigate } from "react-router-dom";

export const MakeOrder = () => {
  const { data } = useData("/v1/products?all=true", "products");
  const [selected, setSelected] = useState("");
  const [values, setValues] = useState({
    user_id: getUserIdFromLocalStorage(),
    items: [],
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setSelected(e.target.value);
  };

  const onAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      if (!selected) return;
      setValues((prev) => {
        const items = prev.items;

        return { ...prev, items: [...items, { id: selected, quantity: 1 }] };
      });
      setSelected("");
    },
    [selected]
  );

  const onRemoveItem = (e) => {
    const id = +e.currentTarget.dataset.index;
    setValues((prev) => {
      const items = prev.items;

      return { ...prev, items: items.filter((_, index) => index !== id) };
    });
  };

  const onOrder = async () => {
    if (!values.items.length) {
      return;
    }
    await api.post("/v1/orders", values);
    toast.success("Order has been created");
    navigate("/orders");
  };

  return (
    <AppCard title={"Add to cart"}>
      <Form onSubmit={onAddToCart}>
        <FormGroup row>
          <Label for="source" sm={2}>
            Select Item
          </Label>
          <Col sm={10}>
            <Input
              id="source"
              name="item"
              type="select"
              onChange={onChange}
              value={selected}
            >
              <option value={""}>Select Item</option>
              {data.map((item) => (
                <option value={item._id} key={uniqueId()}>
                  {item.name}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <Button type="submit">Add to cart</Button>
      </Form>
      <div>
        <Cart items={values.items} onRemove={onRemoveItem} products={data} />
      </div>
      <div>
        <Button
          color="success"
          onClick={onOrder}
          disabled={!values.items.length}
        >
          Make Order
        </Button>
      </div>
    </AppCard>
  );
};
