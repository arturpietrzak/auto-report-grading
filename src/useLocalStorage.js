export default function useLocalStorage() {
  const saveReports = (reports) => {
    localStorage.setItem("reports", JSON.stringify(reports));
  };
  const loadReports = () => {
    return JSON.parse(localStorage.getItem("reports"));
  };

  return { saveReports, loadReports };
}
