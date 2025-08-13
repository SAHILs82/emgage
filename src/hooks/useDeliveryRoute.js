import { useEffect, useState } from "react";
import { getRouteData } from "../data/routerData";

const useDeliveryRoute = (partnerId, dateRange, isPlaying, playbackSpeed) => {
  const [route, setRoute] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [currentDelivery, setCurrentDelivery] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const data = await getRouteData(partnerId, dateRange);
      setRoute(data);
    };
    fetchRoute();
  }, [partnerId, dateRange]);

  useEffect(() => {
    if (!isPlaying || !route) return;

    let animationFrame;
    let startTime;
    let progress = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) * playbackSpeed;
      progress = elapsed / (route.duration * 1000);

      if (progress >= 1) {
        progress = 1;
        setCurrentPosition(route.path[route.path.length - 1]);
        setCurrentDelivery(route.deliveries[route.deliveries.length - 1]);
        return;
      }

      const pointIndex = Math.min(
        Math.floor(progress * (route.path.length - 1)),
        route.path.length - 2
      );

      const point = route.path[pointIndex];
      setCurrentPosition(point);

      const currentDelivery = route.deliveries.find(
        (d) => d.timestamp <= progress * route.duration
      );
      setCurrentDelivery(currentDelivery);

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, route, playbackSpeed]);

  return { route, currentPosition, currentDelivery };
};

export default useDeliveryRoute;
