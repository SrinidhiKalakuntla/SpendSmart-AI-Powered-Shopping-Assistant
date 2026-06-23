import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PurchaseForm from './PurchaseForm';
import PurchaseList from './PurchaseList';
import CategoryPieChart from './CategoryPieChart';
import ProductCompare from './ProductCompare';
import WishlistForm from './components/WishlistForm';
import WishlistDashboard from './components/WishlistDashboard';
import Chatbot from './components/Chatbot';

import './App.css';
import './styles/Home.css';
import './styles/Budget.css';
import './styles/Wishlist.css';
import './styles/Compare.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Your Personal Assistant</h1>
      <ul>
        <li><Link to="/budget" className="nav-button">💰 Budget Tracker</Link></li>
        <li><Link to="/compare" className="nav-button">🛍️ Product Price Comparison</Link></li>
        <li><Link to="/wishlist" className="nav-button">📦 Wishlist Tracker</Link></li>
        <li><Link to="/chatbot" className="nav-button">🤖 AI Shopping Assistant</Link></li>
      </ul>
    </div>
  );
}

function BudgetTracker() {
  const [categoryTotals, setCategoryTotals] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/purchase/summary')
      .then(res => res.json())
      .then(data => setCategoryTotals(data))
      .catch(err => console.error('Error fetching summary:', err));
  }, []);

  return (
    <div className="budget-container">
      <h1>Spending Tracker Dashboard</h1>
      <PurchaseForm />
      <PurchaseList />

      <h2>Total Spent per Category</h2>
      <ul className="budget-summary">
        {categoryTotals.map(cat => (
          <li key={cat._id}>
            {cat._id}: ₹{cat.total}
          </li>
        ))}
      </ul>
      <div className="category-chart">
        <CategoryPieChart data={categoryTotals} />
      </div>
    </div>
  );
}

function WishlistTracker() {
  const [refreshFlag, setRefreshFlag] = React.useState(false);
  const triggerRefresh = () => setRefreshFlag(prev => !prev);

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">📦 Wishlist Tracker</h1>
      <WishlistForm onItemAdded={triggerRefresh} />
      <WishlistDashboard key={refreshFlag} />
    </div>
  );
}

function ComparePage() {
  return (
    <div className="compare-container">
      <h1>🛍️ Product Price Comparison</h1>
      <ProductCompare />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<BudgetTracker />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/wishlist" element={<WishlistTracker />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import PurchaseForm from './PurchaseForm';
// import PurchaseList from './PurchaseList';
// import CategoryPieChart from './CategoryPieChart';
// import ProductCompare from './ProductCompare';
// import WishlistForm from './components/WishlistForm';
// import WishlistDashboard from './components/WishlistDashboard';
// import './App.css';
// import './styles/Home.css';
// import './styles/Budget.css';
// import './styles/Wishlist.css';
// import './styles/Compare.css';

// function Home() {
//   return (
//     <div className="home-container">
//       <h1>Welcome to Your Personal Assistant</h1>
//       <ul>
//         <li><Link to="/budget" className="nav-button">💰 Budget Tracker</Link></li>
//         <li><Link to="/compare" className="nav-button">🛍️ Product Price Comparison</Link></li>
//         <li><Link to="/wishlist" className="nav-button">📦 Wishlist Tracker</Link></li>
//       </ul>
//     </div>
//   );
// }

// function BudgetTracker() {
//   const [categoryTotals, setCategoryTotals] = React.useState([]);
//   const [refreshFlag, setRefreshFlag] = React.useState(false);

//   const fetchSummary = () => {
//     fetch('/api/purchase/summary')
//       .then(res => res.json())
//       .then(data => setCategoryTotals(data))
//       .catch(err => console.error('Error fetching summary:', err));
//   };

//   React.useEffect(() => {
//     fetchSummary();
//   }, [refreshFlag]); // ✅ re-run when refreshFlag changes

//   const triggerRefresh = () => setRefreshFlag(prev => !prev);

//   return (
//     <div className="budget-container">
//       <h1>Spending Tracker Dashboard</h1>
//       {/* Pass triggerRefresh to PurchaseForm */}
//       <PurchaseForm onPurchaseAdded={triggerRefresh} />
//       {/* Re-render PurchaseList when refreshFlag changes */}
//       <PurchaseList key={refreshFlag} />

//       <h2>Total Spent per Category</h2>
//       <ul className="budget-summary">
//         {categoryTotals.map(cat => (
//           <li key={cat._id}>
//             {cat._id}: ₹{cat.total}
//           </li>
//         ))}
//       </ul>
//       <div className="category-chart">
//         <CategoryPieChart data={categoryTotals} />
//       </div>
//     </div>
//   );
// }

// function WishlistTracker() {
//   const [refreshFlag, setRefreshFlag] = React.useState(false);
//   const triggerRefresh = () => setRefreshFlag(prev => !prev);

//   return (
//     <div className="wishlist-container">
//       <h1 className="wishlist-title">📦 Wishlist Tracker</h1>
//       <WishlistForm onItemAdded={triggerRefresh} />
//       <WishlistDashboard key={refreshFlag} />
//     </div>
//   );
// }

// function ComparePage() {
//   return (
//     <div className="compare-container">
//       <h1>🛍️ Product Price Comparison</h1>
//       <ProductCompare />
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/budget" element={<BudgetTracker />} />
//         <Route path="/compare" element={<ComparePage />} />
//         <Route path="/wishlist" element={<WishlistTracker />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
