import { useMemo } from 'react';
import * as d3 from 'd3';

const MARGIN = 50;
const BAR_PADDING = 0.2;

export const COLORS = ['#cc90e1', '#822335', '#cb593d'];

type DataItem = {
    name: string;
    value: number;
};

type CircularBarplotProps = {
    width: number;
    height: number;
    data: DataItem[];
};

export const MoodChart: React.FC<CircularBarplotProps> = ({ width, height, data }) => {
    const innerRadius = (Math.min(width, height) / 2) * 0.3;
    const outerRadius = Math.min(width, height) / 2 - MARGIN;
  
    const groups = data.map((d) => d.name);
    // const groups = [...new Set(data.map(d => d.group))];
    // const subGroups = [...new Set(data.map(d => d.subgroup))];
  
    const xScale = d3
      .scaleBand<string>()
      .domain(groups)
      .range([0, 2 * Math.PI])
      .padding(BAR_PADDING);
  
    const yScale = d3
      .scaleRadial<number, number>()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([innerRadius, outerRadius]);
  
    const arcPathGenerator = d3.arc();
  
    const allShapes = data.map((group, i) => {
      const path = arcPathGenerator({
        innerRadius: innerRadius,
        outerRadius: yScale(group.value),
        startAngle: xScale(group.name)!,
        endAngle: xScale(group.name)! + xScale.bandwidth(),
      });
      
        const barAngle = xScale(group.name)! + xScale.bandwidth() / 2; // (in Radian)
        const turnLabelUpsideDown = (barAngle + Math.PI) % (2 * Math.PI) < Math.PI;
        const labelRotation = (barAngle * 180) / Math.PI - 90; // (convert radian to degree)
        const labelXTranslation = yScale(group.value) + 10;
        const labelTransform =
        "rotate(" +
        labelRotation +
        ")" +
        ",translate(" +
        labelXTranslation +
        ",0)";

        return (
        <g key={i}>
            <path
            d={path!}
            opacity={0.7}
            stroke="#822335"
            fill="#822335"
            fillOpacity={0.3}
            strokeWidth={1}
            rx={1}
            />
            <g transform={labelTransform}>
            <text
                textAnchor={turnLabelUpsideDown ? "end" : "start"}
                alignmentBaseline="middle"
                fontSize={12}
                transform={turnLabelUpsideDown ? "rotate(180)" : "rotate(0)"}
                fill="#cc90e1"
            >
                {group.name!}
            </text>
            </g>
        </g>
        );
    });
  
    return (
      <div>
        <svg width={width} height={height}>
            <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
                {allShapes}
            </g>
        </svg>
      </div>
    );
  };