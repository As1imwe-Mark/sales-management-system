// app/admin/page.js
import { getServerSession } from 'next-auth';
import AdminSalesList from '@/components/AdminSalesList';
import ExportSales from '@/components/ExportSales';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'Admin') {
    return (
      <div>
        <p>Access Denied: You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <AdminSalesList />
      <ExportSales />
    </div>
  );
}
