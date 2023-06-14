import { useState } from "react";

interface StatisticProps {
  text: string;
  value: number | string;
}

const StatisticLine: React.FC<StatisticProps> = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

interface StatisticsProps {
  good: number;
  neutral: number;
  bad: number;
}

const Statistics: React.FC<StatisticsProps> = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback > 0 ? (good - bad) / totalFeedback : 0;
  const positiveFeedbackPercentage =
    totalFeedback > 0 ? (good / totalFeedback) * 100 : 0;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalFeedback} />
          <StatisticLine text="average" value={averageScore.toFixed(2)} />
          <StatisticLine
            text="Positive"
            value={`${positiveFeedbackPercentage.toFixed(2)}%`}
          />
        </tbody>
      </table>
    </div>
  );
};

const Button: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return <button onClick={onClick}>{text}</button>;
};

const App: React.FC = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedbackGiven = good + neutral + bad > 0;

  const incrementFeedback = (feedbackType: string) => {
    if (feedbackType === "good") {
      setGood(good + 1);
    } else if (feedbackType === "neutral") {
      setNeutral(neutral + 1);
    } else if (feedbackType === "bad") {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => incrementFeedback("good")} />
      <Button text="neutral" onClick={() => incrementFeedback("neutral")} />
      <Button text="bad" onClick={() => incrementFeedback("bad")} />

      {feedbackGiven ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <div>
          <h2>statistics</h2>
          <p>No feedback given</p>
        </div>
      )}
    </div>
  );
};

export default App;
