import React from "react"
import styles from "./formResponse.module.css"
import { Doughnut } from "react-chartjs-2"
import "chart.js/auto"

function FormResponse({ theme }) {
  // Dummy data (replace with actual database data)
  const [data, setData] = React.useState([])
  const stats = {
    views: 6,
    starts: 100,
    completed: 33,
    completionRate: (33 / 100) * 100,
  }

  const chartData = {
    datasets: [
      {
        data: [stats.completed, stats.starts - stats.completed],
        backgroundColor: ["#3498db", "#d3d3d3"],
        borderWidth: 0,
      },
    ],
    labels: ["Completed", "Incomplete"],
  }

  return (
    <div className={`${styles.responseSection} ${theme === "dark" ? styles.dark : ""}`}>
      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <h3>Views</h3>
          <p>{stats.views}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Starts</h3>
          <p>{stats.starts}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>

      {/* Table Section */}
      <table className={styles.responseTable}>
        <thead>
          <tr>
            <th>Submitted at</th>
            <th>Email</th>
            <th>Text</th>
            <th>Button</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((response, index) => (
            <tr key={index}>
              <td>{response.submittedAt}</td>
              <td>{response.email}</td>
              <td>{response.text}</td>
              <td>{response.button}</td>
              <td>{response.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Completion Chart */}
      <div className={styles.chartSection}>
        <Doughnut data={chartData} />
        <div className={styles.chartLabel}>
          <p>Completion rate</p>
          <p>{stats.completionRate.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  )
}

export default FormResponse
