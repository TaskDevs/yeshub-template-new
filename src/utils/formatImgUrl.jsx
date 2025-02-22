const formatImgUrl = (imgPath) => {
  if (imgPath) {
    const newPath = imgPath.startsWith("/") ? imgPath.substring(1) : imgPath;
    return newPath;
  }
};

export default formatImgUrl;
