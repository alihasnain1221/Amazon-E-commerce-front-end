import React, { useState } from "react";
import { Card, FormControl, MenuItem, Select, Typography } from "@mui/material";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { selectColor } from "../../../utils";
import { ESTIMATION_CHARTS_OPTIONS } from "../../../constants/constant";

const EstimationCharts = () => {
  const { baseNodes } = useSelector((state) => state.nodes);
  const [chartBasis, setChartBasis] = useState("monthly");
  const classes = useStyles();
  const data = {
    labels: baseNodes.map((node) => node.name),
    datasets: [
      {
        label: "Bar Chart",
        data: baseNodes.map((node) =>
          chartBasis === "monthly"
            ? node.estimations.monthlySalesEstimation
            : node.estimations.weeklySalesEstimation
        ),
        backgroundColor: baseNodes.map((_, i) =>
          selectColor(i + 1, baseNodes.length, 0.2)
        ),
        borderColor: baseNodes.map((_, i) =>
          selectColor(i + 1, baseNodes.length, 1)
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Categories",
          padding: "6",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Estimated units selling",
          padding: "6",
        },
      },
    },
  };
  return (
    <>
      <Card className={classes.wrapperContainer}>
        <Typography variant="h4" component="h4">
          Estimation Chart
        </Typography>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={
                ESTIMATION_CHARTS_OPTIONS.find(
                  (opt) => opt.value === chartBasis
                ).value
              }
              onChange={(e) => setChartBasis(e.target.value)}
            >
              {ESTIMATION_CHARTS_OPTIONS.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.graphContainer}>
          <Bar data={data} options={options} />
        </div>
      </Card>
    </>
  );
};

export default EstimationCharts;
