const sendNotification = async (pushToken, title, body, data = {}) => {
    if (!pushToken || pushToken.trim() === "") return;
    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          to: pushToken,
          title,
          body,
          data,
          sound: "default",
          priority: "high",
        }),
      });
      const result = await response.json();
      if (result?.data?.status === "error") {
        console.log("⚠️ Notification failed:", result.data.message);
      } else {
        console.log("📲 Notification sent successfully");
      }
    } catch (err) {
      console.log("⚠️ Notification error:", err.message);
    }
  };
  
  export default sendNotification;