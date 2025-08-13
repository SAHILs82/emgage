// Sample route data generator
export const getRouteData = async (partnerId, dateRange) => {
  // In a real app, this would fetch from an API
  return {
    path: generateRandomRoute(28.6139, 77.209, 0.1, 50),
    deliveries: generateDeliveries(50),
    duration: 3600, // 1 hour in seconds
  };
};

function generateRandomRoute(lat, lng, range, points) {
  const route = [];
  for (let i = 0; i < points; i++) {
    route.push([
      lat + (Math.random() * range * 2 - range),
      lng + (Math.random() * range * 2 - range),
    ]);
  }
  return route;
}

function generateDeliveries(count) {
  const deliveries = [];
  for (let i = 0; i < count; i++) {
    deliveries.push({
      orderId: `ORDER${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: Math.floor(Math.random() * 3600),
      address: `Location ${i + 1}`,
      status: i % 3 === 0 ? "Pending" : "Delivered",
    });
  }
  return deliveries.sort((a, b) => a.timestamp - b.timestamp);
}
