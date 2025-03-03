import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Hem = () => {
  const loggedIn = {firstName: "Marius", lastName: "Christensen", email: "marius.christensen@outlook.com"};

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Välkommen"
            user={loggedIn?.firstName || "Gäst"}
            subtext="Få tillgång till och hantera ditt konto och dina transaktioner effektivt."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={30459.97}
          />
        </header>
        SENASTE TRANSAKTIONER
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 30459.97 }, { currentBalance: 54459.97 }]}
      />
    </section>
  );
}

export default Hem