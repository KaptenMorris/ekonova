import HeaderBox from '@/components/HeaderBox'
import RigthSidebar from '@/components/RigthSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Hem = () => {
  const loggedIn = {
    firstName: "Marius",
    lastName: "Christensen",
    email: "info@marius-christensen.se",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Välkommen"
            user={loggedIn.firstName || "Gäst"}
            subtext="Få åtkomst till och hantera ditt konto och transaktioner"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={320000.97}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RigthSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.50 }, { currentBalance: 500.50 }]}
      />
    </section>
  );
}

export default Hem