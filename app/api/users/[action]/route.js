import { dbConnect } from '../../../lib/mongoose';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await dbConnect();
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST' && req.query.action === 'onboard') {
    // Onboard new salesman
    const { name, email } = req.body;
    try {
      const user = await User.create({ name, email, role: 'salesman' });
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'PUT' && req.query.action === 'revoke') {
    // Revoke access
    const { userId } = req.body;
    try {
      const user = await User.findByIdAndUpdate(userId, { role: 'revoked' }, { new: true });
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE' && req.query.action === 'terminate') {
    // Terminate a salesman
    const { userId } = req.body;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
