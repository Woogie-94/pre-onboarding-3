interface Props {
  width?: string;
  height?: string;
  fill?: string;
}
const CloseSvg = ({ width = "12", height = "12", fill = "#fff" }: Props) => {
  return (
    <svg width={width} height={height} fill={fill} xmlns="http://www.w3.org/2000/svg" color="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 6.414l3.293 3.293 1.414-1.414L6.414 5l3.293-3.293L8.293.293 5 3.586 1.707.293.293 1.707 3.586 5 .293 8.293l1.414 1.414L5 6.414z"
      />
    </svg>
  );
};

export default CloseSvg;
