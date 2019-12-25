import React from 'react';
import * as d3 from 'd3';
import { hierarchy } from 'd3-hierarchy';

/* const data = {
  value: 1,
  children: [
    { value: 1 },
    { value: 1 },
    {
      value: 1,
      children: [
        { value: 1 },
        { value: 1 },
        {
          value: 1,
          children: [{ value: 1 }, { value: 1 }]
        }
      ]
    }
  ]
}; */

const generateMondrian = ({ value, depth = 0 }) => {
  const N = Math.round(Math.random() * 5);

  const createColor = ({ red, blue, yellow, black }) => {
    const probabilitySpace = [
      ...new Array(red * 10).fill('red'),
      ...new Array(blue * 10).fill('blue'),
      ...new Array(yellow * 10).fill('yellow'),
      ...new Array(black * 10).fill('black'),
      ...new Array(red * 10 + blue * 10 + yellow * 10 + black * 10).fill(
        '#fffaf1'
      )
    ];

    return d3.shuffle(probabilitySpace)[0];
  };

  return {
    value,
    color: createColor({ red: 0.3, blue: 0.2, yellow: 0.6, black: 0.4 }),
    children:
      depth < 3
        ? d3.range(N).map(_ =>
            generateMondrian({
              value: value / N,
              depth: depth + 1
            })
          )
        : null
  };
};

const MondrianRect = ({ node }) => {
  const { x0, y0, x1, y1, children } = node,
    width = x1 - x0,
    height = y1 - y0;

  /* const color = () => {
    const ratio = width > height ? height / width : width / height;
    if (!node.parent) {
      return 'black';
    } else if (ratio >= 0.9) {
      return 'red';
    } else if (ratio >= 0.7) {
      return 'blue';
    } else if (ratio >= 0.4) {
      return 'yellow';
    } else {
      return '#fffaf1';
    }
  }; */
  console.log('children', children);
  console.log('nodes', node);
  return (
    <>
      <rect
        x={x0}
        y={y0}
        width={width}
        height={height}
        style={{
          fill: node.data.color,
          stroke: 'black',
          strokeWidth: 5
        }}
      />
      {children &&
        children.map((node, i) => <MondrianRect node={node} key={i} />)}
    </>
  );
};

const Mondrian = ({ x, y, width, height }) => {
  const treemap = d3
    .treemap()
    .size([width, height])
    .padding(5)
    .tile(d3.treemapBinary);

  const data = generateMondrian({ value: 100 });

  const root = treemap(
    hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value)
  );
  console.log(root);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <MondrianRect node={root} />
    </g>
  );
};

export default Mondrian;
