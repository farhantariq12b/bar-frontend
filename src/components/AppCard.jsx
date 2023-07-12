import { Card, CardBody, CardTitle } from "reactstrap";

export const AppCard = ({ title, children }) => {
  return (
    <Card className="p-2">
      <CardTitle>{title}</CardTitle>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
