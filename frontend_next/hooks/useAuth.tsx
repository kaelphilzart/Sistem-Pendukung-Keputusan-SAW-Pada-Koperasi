import axios from '@/lib/axios';

const getUserRole = async () => {
  try {
    const response = await axios.get('/api/get-user-role'); // Ganti dengan URL endpoint Anda
    const { name, role, id } = response.data;

    // Gunakan informasi role untuk mengatur tampilan atau perilaku komponen Anda
    console.log('Name pengguna:', name);
    console.log('Role pengguna:', role);
    console.log('id Pengguna', id);
    return { name, role, id };
  } catch (error) {
    console.error('Error fetching user role:', error);
  }
};

export default getUserRole;
