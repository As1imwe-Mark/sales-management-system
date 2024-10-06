"use client"

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function ExportButton({ sales }) {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sales.filter(sale => sale.status === 'Approved'));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Approved Sales');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'approved_sales.xlsx');
  };

  return <button onClick={exportToExcel}>Export to Excel</button>;
}
