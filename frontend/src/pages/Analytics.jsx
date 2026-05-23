import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyLineChart from "../components/MonthlyLineChart";
import GraphAnalytics from "../components/GraphAnalytics";
import Income_Expenses from "../components/Income_Expenses";
function Analytics() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <ExpensePieChart />
      <MonthlyLineChart />
      <GraphAnalytics />
      <Income_Expenses/>
    </div>
  );
}

export default Analytics;