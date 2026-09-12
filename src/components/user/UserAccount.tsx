import { useState } from 'react';
import { useUser, Address } from '../../context/UserContext';

export default function UserAccount() {
  const { user, updateProfile, addAddress, updateAddress, removeAddress, setDefaultAddress } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses'>('profile');
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  const [showAddAddress, setShowAddAddress] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your account</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-light tracking-wide mb-8">My Account</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 px-4 text-sm tracking-widest uppercase transition-colors ${
            activeTab === 'profile' ? 'border-b-2 border-black' : 'text-gray-500 hover:text-black'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-4 px-4 text-sm tracking-widest uppercase transition-colors ${
            activeTab === 'addresses' ? 'border-b-2 border-black' : 'text-gray-500 hover:text-black'
          }`}
        >
          Addresses
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && <ProfileTab user={user} updateProfile={updateProfile} />}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <AddressesTab
          addresses={user.addresses}
          defaultAddress={user.defaultAddress}
          addAddress={addAddress}
          updateAddress={updateAddress}
          removeAddress={removeAddress}
          setDefaultAddress={setDefaultAddress}
          editingAddress={editingAddress}
          setEditingAddress={setEditingAddress}
          showAddAddress={showAddAddress}
          setShowAddAddress={setShowAddAddress}
        />
      )}
    </div>
  );
}

function ProfileTab({ user, updateProfile }: any) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ firstName, lastName, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-light mb-6">Personal Information</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleSave}
            className="bg-black text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-sm text-green-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved!
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100">
        <h3 className="text-sm font-medium mb-2">Account Information</h3>
        <p className="text-xs text-gray-500">
          Member since: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

function AddressesTab({
  addresses,
  defaultAddress,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  editingAddress,
  setEditingAddress,
  showAddAddress,
  setShowAddAddress,
}: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light">Shipping Addresses</h2>
        <button
          onClick={() => {
            setShowAddAddress(true);
            setEditingAddress(null);
          }}
          className="bg-black text-white px-6 py-2 text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors"
        >
          + Add Address
        </button>
      </div>

      {addresses.length === 0 && !showAddAddress && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-500 mb-4">No addresses saved yet</p>
          <button
            onClick={() => setShowAddAddress(true)}
            className="text-sm underline hover:no-underline"
          >
            Add your first address
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address: Address, index: number) => (
          <div
            key={address.id}
            className={`bg-white border rounded-lg p-6 ${
              index === defaultAddress ? 'border-black' : 'border-gray-200'
            }`}
          >
            {index === defaultAddress && (
              <span className="inline-block bg-black text-white text-xs px-2 py-1 mb-3">
                Default
              </span>
            )}

            <p className="text-sm font-medium mb-2">
              {address.firstName} {address.lastName}
            </p>
            <p className="text-sm text-gray-600 mb-1">{address.street}</p>
            <p className="text-sm text-gray-600 mb-1">
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-sm text-gray-600 mb-1">{address.country}</p>
            <p className="text-sm text-gray-600">{address.phone}</p>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              {index !== defaultAddress && (
                <button
                  onClick={() => setDefaultAddress(index)}
                  className="text-xs underline hover:no-underline"
                >
                  Set as Default
                </button>
              )}
              <button
                onClick={() => {
                  setEditingAddress(index);
                  setShowAddAddress(false);
                }}
                className="text-xs underline hover:no-underline"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this address?')) {
                    removeAddress(index);
                  }
                }}
                className="text-xs text-red-600 underline hover:no-underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {(showAddAddress || editingAddress !== null) && (
        <AddressForm
          address={editingAddress !== null ? addresses[editingAddress] : null}
          onSave={(addressData: Omit<Address, 'id'>) => {
            if (editingAddress !== null) {
              updateAddress(editingAddress, { ...addressData, id: addresses[editingAddress].id });
            } else {
              addAddress(addressData);
            }
            setEditingAddress(null);
            setShowAddAddress(false);
          }}
          onCancel={() => {
            setEditingAddress(null);
            setShowAddAddress(false);
          }}
        />
      )}
    </div>
  );
}

function AddressForm({ address, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    label: address?.label || 'Home',
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
    country: address?.country || '',
    phone: address?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-light mb-4">
        {address ? 'Edit Address' : 'Add New Address'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
            Address Label
          </label>
          <select
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
            Street Address *
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              City *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              State/Province *
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              Country *
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2 text-gray-600">
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors"
          >
            {address ? 'Update Address' : 'Add Address'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 text-xs tracking-widest uppercase border border-gray-200 hover:border-black transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
