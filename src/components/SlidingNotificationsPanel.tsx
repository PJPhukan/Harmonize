"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Notification {
  _id: string;
  owner: string;
  message: string;
  postId?: string; // For connection requests
  requesterURL?: string; // For connection requests
  requester?: string; // For connection requests
}

interface SlidingNotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlidingNotificationsPanel: React.FC<SlidingNotificationsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>();

  //fetch all notifications
  const fetchNotifications = async () => {
    // console.log("fetching notifications");
    try {
      const response = await axios.get("/api/get-all-notification");
      console.log(response.data.data);
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.log("Error occured while fetching notifications", error);
      // console.error(error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  //accept connection request
  const acceptConnectionRequest = async (
    notificationId: string,
    requesterId: string
  ) => {
    try {
      const response = await axios.patch("/api/connection-accept", {
        notificationId,requesterId
      });
      console.log(response);
      if (response.data.success) {
        setNotifications((prev) =>
          prev?.filter((notification) => notification._id !== notificationId)
        );
      }
    } catch (error) {
      // console.error(error);

      console.log("Error occured while accepting notification", error);
    }
  };
  const handleAcceptRequest = (id: string) => {
    // Simulate accepting a request
    alert("Connection request accepted!");
    setNotifications((prev) =>
      prev?.filter((notification) => notification._id !== id)
    );
  };

 

  return (
    <div
    className={`fixed top-0 left-0 h-full w-[24rem] bg-white shadow-lg z-50 transform transition-transform duration-300 text-black ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } `}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>
      </div>
      <div className="p-4 space-y-4">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="p-3 border rounded bg-gray-50 hover:bg-gray-100 flex flex-col"
            >
              {/* {console.log("Notification", notification)} */}
              <p>{notification.message}</p>
              {notification.requester && (
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={() =>
                      acceptConnectionRequest(
                        notification._id,
                        notification.requester!
                      )
                    }
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      setNotifications((prev) =>
                        prev?.filter((n) => n._id !== notification._id)
                      )
                    }
                    className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Ignore
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default SlidingNotificationsPanel;
