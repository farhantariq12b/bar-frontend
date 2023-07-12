import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";

import { AppCard } from "./AppCard";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { uniqueId } from "lodash";
import { useData } from "../hooks/useData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const MakeADeal = () => {
  const { data } = useData("/v1/products?all=true", "products");
  const [values, setValues] = useState({
    item: "",
    addon: "",
    discount: 0,
    discount_type: "amount",
    max_discount_cap: 0,
  });

  const onSourceChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.item === values.addon) {
      toast.error("Item and addon must be different");
      return;
    }
    await api.post("/v1/deals", values);
    toast.success("Deal Created");
    navigate("/deals");
  };
  return (
    <AppCard title="Make A Deal">
      <Form onSubmit={onSubmit}>
        <FormGroup row>
          <Label for="source" sm={2}>
            Select Item
          </Label>
          <Col sm={10}>
            <Input
              id="source"
              name="item"
              type="select"
              onChange={onSourceChange}
              value={values.item}
            >
              <option value={""}>Select Source Item</option>
              {data.map((item) => (
                <option value={item._id} key={uniqueId()}>
                  {item.name}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="source" sm={2}>
            Select Addon
          </Label>
          <Col sm={10}>
            <Input
              id="source"
              name="addon"
              type="select"
              onChange={onSourceChange}
              value={values.addon}
            >
              <option value={""}>Select Addon</option>
              {data.map((item) => (
                <option value={item._id} key={uniqueId()}>
                  {item.name}
                </option>
              ))}
            </Input>
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
