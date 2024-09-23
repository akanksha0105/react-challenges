import { placeholderImage } from "../utilities/helper";

const ShimmerGridItem = () => {
  return (
    <div className="gridItem">
      <img src={placeholderImage} alt="poster-image" loading="lazy" />
    </div>
  );
};

export default ShimmerGridItem;