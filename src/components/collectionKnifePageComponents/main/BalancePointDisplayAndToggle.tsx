interface params {
  balancePoint: string;
  editable: boolean;
}

const BalancePointEditAndToggle = ({ balancePoint, editable }: params) => {
  const getBalance = () => {
    switch (JSON.parse(balancePoint)) {
      case "MODULAR":
        return "Modular Balance";
      case "0":
        return "Heavy Blade Bias";
      case "1":
        return "Blade Bias";
      case "2":
        return "Moderate Blade Bias";
      case "3":
        return "Neutral";
      case "4":
        return "Moderate Handle Bias";
      case "5":
        return "Handle Bias";
      case "6":
        return "Heavy Handle Bias";
      default:
        return "";
    }
  };

  if (editable) {
    return (
      <div className="text-xl w-full">
        <p>Balance: {getBalance()}</p>
      </div>
    );
  } else {
    return (
      <div className="text-xl w-full">
        <p>Balance: {getBalance()}</p>
      </div>
    );
  }
};

export default BalancePointEditAndToggle;
