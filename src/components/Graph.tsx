import React from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import '../assets/styles/Graph.css';

/**
 * Graph component for displaying the generated value and graph.
 */
const Graph: React.FC = () => {
  const generatedValue = useSelector((state: RootState) => state.reduxStore.generatedValue);
  const graphValue = [{ value: 0 }, { value: 0 }, { value: generatedValue }];
  const speedValue = useSelector((state: RootState) => state.reduxStore.speed);

  /**
   * Calculate the speed for the graph animation.
   * @returns {number} - Speed in milliseconds.
   */
  const calcSpeed = (): number => {
    return 3000 + 1000 * speedValue;
  };

  return (
    <div className="col-12 mt-3">
      <div className="card-box graph-box">
        <div className="result">
          <CountUp
            start={0}
            end={generatedValue}
            redraw={false}
            duration={calcSpeed() / 1000}
            separator=" "
            decimals={2}
            decimal="."
            suffix="x"
          />
        </div>

        <LineChart
          width={500}
          height={300}
          data={graphValue}
          key={Math.random()}
        >
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            stroke="#fb544e"
            dot={false}
            animationDuration={calcSpeed()}
            hide={generatedValue === 0}
          />
          <YAxis domain={[0, 10]} hide />
          <XAxis dataKey="value" hide />
        </LineChart>
      </div>
    </div>
  );
}

export default Graph;
