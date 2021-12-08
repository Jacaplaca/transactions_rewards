import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import useTransactions from "../apiCalls/useTransactions";
import getRewards from "../logic/getRewards";
import styles from "../styles/Home.module.css";
import styled from "styled-components";

const Transactions = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 0px;
  .list {
    .list__row {
      width: 100%;
      display: flex;
      gap: 0 7px;
      padding: 0px;
      justify-content: space-between;
      p {
        margin: 0;
        padding: 2px;
      }
    }
  }
`;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Home: NextPage = () => {
  const transactions = useTransactions();
  const [rewards, setRewards] = useState<ReturnType<typeof getRewards> | null>(
    null
  );

  useEffect(() => {
    setRewards(getRewards(transactions));
  }, [transactions]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Transactions </title>
      </Head>

      <main className={styles.main}>
        <Transactions>
          <h4>Transactions</h4>
          <div className="list">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="list__row">
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
                <p>{transaction.userName}</p>
                <p>{formatter.format(transaction.amount)}</p>
              </div>
            ))}
          </div>
        </Transactions>
        <Transactions>
          <h4>All months</h4>
          <div className="list">
            {rewards &&
              Object.entries(rewards.pointsForAllMonths)
                .sort((a, b) => b[1].points - a[1].points)
                .map(([key, value]) => {
                  const { userName, points } = value;
                  return (
                    <div key={key} className="list__row">
                      <p>{userName}</p>
                      <p>{points}</p>
                    </div>
                  );
                })}
          </div>
        </Transactions>
        <Transactions>
          <h4>Monthly</h4>
          <div className="list">
            {rewards &&
              Object.entries(rewards.pointsForEveryMonth).map(
                ([key, value]) => {
                  const month = new Date(2020, Number(key), 1).getMonth();
                  return (
                    <div key={key} className="list">
                      <h4>{monthNames[month]}</h4>
                      {Object.entries(value)
                        .sort((a, b) => b[1].points - a[1].points)
                        .map(([key, value]) => {
                          const { userName, points } = value;
                          return (
                            <div key={key} className="list__row">
                              <p>{userName}</p>
                              <p>{points}</p>
                            </div>
                          );
                        })}
                    </div>
                  );
                }
              )}
          </div>
        </Transactions>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
