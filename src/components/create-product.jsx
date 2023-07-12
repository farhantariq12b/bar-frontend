import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";

import { AppCard } from "./AppCard";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    price: 1,
    tax: 0,
    discount: 0,
    discount_type: "amount",
    max_discount_cap: 0,
  });

  const navigate = useNavigate();

  const onSourceChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post("/v1/products", values);
    toast.success("Product Added");
    navigate("/products");
  };
  return (
    <AppCard title="Make A Deal">
      <Form onSubmit={onSubmit}>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              id="exampleEmail"
              name="name"
              placeholder="xyz"
              type="text"
              required
              value={values.name}
              onChange={onSourceChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Price
          </Label>
          <Col sm={10}>
            <Input
              id="exampleEmail"
              name="price"
              placeholder="10"
              type="number"
              min={1}
              required
              value={values.price}
              onChange={onSourceChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Tax
          </Label>
          <Col sm={10}>
            <Input
              id="exampleEmail"
              name="tax"
              placeholder="0"
              type="number"
              min={0}
              required
              value={values.tax}
              onChange={onSourceChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Discount
          </Label>
          <Col sm={10}>
            <Input
              id="exampleEmail"
              name="discount"
              placeholder="2"
              type="number"
              min={0}
              value={values.discount}
              onChange={onSourceChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="disc_type" sm={2}>
            Discount Type
          </Label>
          <Col sm={10}>
            <Input
              id="disc_type"
              name="discount_type"
              placeholder="Select"
              type="select"
              value={values.discount_type}
              onChange={onSourceChange}
            >
              <option>amount</option>
              <option>percent</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="example" sm={2}>
            Max Discount Cap
          </Label>
          <Col sm={10}>
            <Input
              id="example"
              name="max_discount_cap"
              placeholder="2"
              type="number"
              min={0}
              value={values.max_discount_cap}
              onChange={onSourceChange}
            />
          </Col>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </AppCard>
  );
};
