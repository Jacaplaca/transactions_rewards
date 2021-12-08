import { TransactionType } from "../apiCalls/useTransactions";

export const getOverSteps = (amount: number) => {

  if (amount > 50 && amount <= 100) {
    return [amount - 50, 0];
  }

  if (amount > 100) {
    return [50, amount - 100];
  }

  return [0, 0];
};

export const calculateRewardForTransaction = (amount: number) => {
  const [over50under100, over100] = getOverSteps(amount);

  const awardForUnitOver50under100 = 1;
  const awardsForUnitOver50under100sum =
    over50under100 * awardForUnitOver50under100;

  const awardForUnitOver100 = 2;
  const awardsForUnitOver100sum = over100 * awardForUnitOver100;

  return awardsForUnitOver50under100sum + awardsForUnitOver100sum;
};

const getTotalPointsForUsers = (transactions: TransactionType[]) => transactions.reduce((acc, curr) => {
    const { userId, userName, amount } = curr;
    const pointsFromAmount = calculateRewardForTransaction(amount);
    const accUser = acc[userId];

    if (!accUser) {
      return { ...acc, [userId]: { userName, points: pointsFromAmount } };
    }

    const { points } = accUser;
    const newUser = { ...accUser, points: points + pointsFromAmount };

    return { ...acc, [userId]: newUser };
  }, {} as { [key: string]: { userName: string; points: number } });

const getByMonth = (transactions: TransactionType[]) => transactions.reduce((acc, curr) => {
    const { date } = curr;
    const month = new Date(date).getMonth();
    const accMonth = acc[month];

    if (!accMonth) {
      return { ...acc, [month]: [curr] };
    }
    
    const newMonth = [...accMonth, curr];
    
    return { ...acc, [month]: newMonth };
  }, {} as { [key: string]: TransactionType[] });

const getPointsForEveryUserMonthly = (transactions: TransactionType[]) => {
  const byMonth = getByMonth(transactions);

  return Object.keys(byMonth).reduce((acc, curr) => {
    const transactions = byMonth[curr];
    const points = getTotalPointsForUsers(transactions);
    return { ...acc, [curr]: points };
  }, {} as { [key: string]: { [key: string]: { userName: string; points: number } } });
};

const getRewards = (transactions: TransactionType[]) => {
  const pointsForEveryMonth = getPointsForEveryUserMonthly(transactions);
  const pointsForAllMonths = getTotalPointsForUsers(transactions);
  
  return { pointsForEveryMonth, pointsForAllMonths };
};

export default getRewards;