import SummaryCards from "../components/SummaryCards";
import BudgetProgress from "../components/BudgetProgress";
import TransactionTable from "../components/TransactionTable";
import AIInsights from "./AIInsights";
function Dashboard() {
  return (
    <div className="space-y-8">

      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TransactionTable />
        <BudgetProgress />
      </div>
    </div>
  );
}

export default Dashboard;