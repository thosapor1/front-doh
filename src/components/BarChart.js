import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart(props) {
  const { data } = props;
  return (
    <div>
      <Bar
        data={data}
        options={{
          responsive: true,
          title: { text: "test Chart", display: true },
          scales: {
            yAexs: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
