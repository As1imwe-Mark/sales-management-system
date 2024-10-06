export default function ExportSales() {
  const handleExport = async () => {
    const res = await fetch('/api/sales/export');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'approved_sales.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <button
        onClick={handleExport}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Export Approved Sales
      </button>
    </div>
  );
}
