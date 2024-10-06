// app/salesman/page.js
import { getServerSession } from 'next-auth';
import SalesForm from '@/components/SalesForm';
import SalesList from '@/components/SalesList';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function SalesmanPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'Salesman') {
    return (
      <div>
        <p>Access Denied: You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <SalesForm />
      <SalesList />
    </div>
  );
}
