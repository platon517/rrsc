export const getScrollParent = (node, speedY, speedX) => {
  if (!node) return null;
  if (
    Math.abs(speedY) > Math.abs(speedX)
      ? speedY > 0
        ? ((node.scrollTop + node.offsetHeight) < node.scrollHeight)
        : (node.scrollTop > 0)
      : speedX > 0
        ? ((node.scrollLeft + node.offsetWidth) < node.scrollWidth)
        : (node.scrollLeft > 0)
  ) {
    return node;
  }

  return getScrollParent(node.parentNode, speedY, speedX) || document.documentElement;
};
