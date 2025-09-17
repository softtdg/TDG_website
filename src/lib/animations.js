// Animation utilities for performance and accessibility

export const prefersReducedMotion = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return false;
};

export const getAnimationConfig = (baseConfig = {}) => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      duration: 0.1,
      ease: "linear",
      ...baseConfig,
      // Disable complex animations for reduced motion
      scale: 1,
      rotate: 0,
      skew: 0,
    };
  }

  return baseConfig;
};

export const getScrollAnimationVariants = (direction = "up", distance = 50) => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  switch (direction) {
    case "up":
      return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      };
    case "down":
      return {
        hidden: { opacity: 0, y: -distance },
        visible: { opacity: 1, y: 0 },
      };
    case "left":
      return {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0 },
      };
    case "right":
      return {
        hidden: { opacity: 0, x: -distance },
        visible: { opacity: 1, x: 0 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      };
    default:
      return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      };
  }
};

export const getStaggerConfig = (staggerDelay = 0.1) => {
  const reducedMotion = prefersReducedMotion();

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerDelay,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };
};

export const getItemVariants = (direction = "up", distance = 30) => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  switch (direction) {
    case "up":
      return {
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      };
    case "down":
      return {
        hidden: { opacity: 0, y: -distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      };
    case "left":
      return {
        hidden: { opacity: 0, x: distance },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      };
    case "right":
      return {
        hidden: { opacity: 0, x: -distance },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      };
    default:
      return {
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      };
  }
};
