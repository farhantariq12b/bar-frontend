import "./order-notifications.css";

import { useEffect, useState } from "react";

import { Alert } from "reactstrap";
import { PUSHER_CREDENTIALS } from "../constants/constants";
import Pusher from "pusher-js";
import { getUserIdFromLocalStorage } from "../helpers/localStorage";
import uniqueId from "lodash/uniqueId";

const pusher = new Pusher(PUSHER_CREDENTIALS.APP_ID, {
  cluster: PUSHER_CREDENTIALS.APP_CLUSTER,
  encrypted: PUSHER_CREDENTIALS.ENCRYPTED,
});

export const OrderNotifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const user = userId ?? getUserIdFromLocalStorage();

  const pusherEventName = `order_status_update_${user}`;

  useEffect(() => {
    if (!user) {
      return;
    }
    const channel = pusher.subscribe("order_update");
    channel.bind(pusherEventName, ({ message }) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      channel.unbind(pusherEventName);
    };
  }, [pusherEventName, user]);

  const onDismiss = (id) => {
    setNotifications((prev) => {
      return [...prev.filter((item) => item.order_id !== id)];
    });
  };

  return (
    <div className="wrapper">
      {notifications.map((item) => (
        <Alert
          color="success"
          key={uniqueId()}
          isOpen={notifications.some(
            (notification) => notification.order_id === item.order_id
          )}
          data-id={item.order_id}
          toggle={() => onDismiss(item.order_id)}
        >
          Your order having id #{item.order_id} has been {item.status}
        </Alert>
      ))}
    </div>
  );
};
