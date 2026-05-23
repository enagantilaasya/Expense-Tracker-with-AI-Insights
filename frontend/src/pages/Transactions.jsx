import AddTransactionForm from "../components/AddTransactionForm";
import TransactionTable from "../components/TransactionTable";

function Transactions() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <AddTransactionForm />
      <TransactionTable />
    </div>
  );
}

export default Transactions;