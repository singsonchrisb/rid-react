import { Icon } from "semantic-ui-react";

export function percentage(a, b) {
  let num1 = Number(a) || 1;
  let num2 = Number(b) || 1;
  const percent = (((num1 - num2) / ((num1 + num2) / 2) * 100)).toFixed(2);

  if (percent < 0) {
    return (
      <span className="percent red">
        {percent.slice(1) + "%"}
        <Icon name="triangle down" className="icon" />
      </span>
    );
  } else {
    return (
      <span className="percent green">
        {percent + "%"}
        <Icon name="triangle up" className="icon" />
      </span>
    );
  }
}
