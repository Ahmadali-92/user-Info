export default function UserInfo({user}) {
  return (
    <div className="w-full md:w-1/2 max-w-md">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">User Info</h2>
        <div className="grid grid-cols-[120px_1fr] gap-y-2">
          <span className="font-semibold">Full Name:</span>
          <span>{user?.fullName || 'Ahmad'}</span>

          <span className="font-semibold">Email:</span>
          <span>{user?.email || 'Ahmad@gmail.com'}</span>

          <span className="font-semibold">Role:</span>
          <span>{user?.role || 'Student'}</span>
        </div>
      </section>
    </div>
  );
}
