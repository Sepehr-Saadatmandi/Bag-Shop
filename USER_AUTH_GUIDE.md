# User Authentication & Shopping Guide

## 🎉 New Feature: User Accounts

Your website now has a complete user authentication system for shopping and checkout!

---

## 🔐 How Users Can Access Their Accounts

### Method 1: Header Icon (Desktop)
- Look for the **person icon** 👤 in the top-right header
- Click it to open the login/register modal

### Method 2: Mobile Menu
- Tap the **hamburger menu** ☰ (mobile only)
- Scroll down and tap **"Sign In"**

### Method 3: Direct URL
- Go to `#/account` in your browser
- You'll be prompted to log in if not authenticated

---

## 📝 Creating an Account

### Step 1: Open Registration
1. Click the person icon or "Sign In" button
2. Click **"Sign Up"** link at the bottom of the login form

### Step 2: Fill in Details
- **First Name** (required)
- **Last Name** (required)
- **Phone Number** (optional)
- **Email Address** (required)
- **Password** (minimum 6 characters)

### Step 3: Submit
- Click **"Create Account"**
- You'll be automatically logged in
- Success message appears for 1 second

---

## 🔑 Logging In

1. Click the person icon or "Sign In" button
2. Enter your **email** and **password**
3. Click **"Sign In"**
4. You'll be redirected to your account

---

## 👤 Managing Your Account

Once logged in, click the **person icon** to see a dropdown menu with:

### My Account
- View and edit your profile
- Update name and phone number
- View account creation date

### Addresses
- Add multiple shipping addresses
- Set a default address
- Edit or delete addresses
- Label addresses (Home, Work, Other)

### Orders
- View order history (coming soon)
- Track order status (coming soon)

### Sign Out
- Log out of your account
- Returns to browsing mode

---

## 🏠 Managing Addresses

### Adding a New Address
1. Go to **My Account** → **Addresses** tab
2. Click **"+ Add Address"** button
3. Fill in the form:
   - Address Label (Home/Work/Other)
   - First & Last Name
   - Street Address
   - City, State, ZIP Code
   - Country
   - Phone Number
4. Click **"Add Address"**

### Setting Default Address
- Click **"Set as Default"** on any saved address
- Default address is highlighted with black border
- Used automatically during checkout

### Editing an Address
1. Click **"Edit"** on the address card
2. Update the information
3. Click **"Update Address"**

### Deleting an Address
1. Click **"Delete"** on the address card
2. Confirm deletion
3. Address is removed immediately

---

## 🛒 Shopping with an Account

### Benefits of Logging In
✅ Save multiple shipping addresses  
✅ Faster checkout process  
✅ Order history tracking  
✅ Personalized experience  
✅ Default address for quick checkout  

### Checkout Process (with account)
1. Add items to cart
2. Click cart icon
3. Click **"Checkout"**
4. Your saved addresses appear
5. Select or add new address
6. Complete payment

---

## 🔒 Security Features

### Password Requirements
- Minimum 6 characters
- Stored securely in browser localStorage
- Not visible to other users

### Session Management
- Stay logged in until you sign out
- Session persists across page refreshes
- Automatic logout option available

### Data Privacy
- All user data stored locally in browser
- No data sent to external servers
- Users can clear data by clearing browser storage

---

## 📱 Mobile Experience

### Mobile Menu Updates
- **Sign In** button visible in mobile menu (when not logged in)
- **My Account** button visible when logged in
- **Admin Login** still accessible for administrators

### Responsive Design
- All account features work on mobile
- Address forms optimized for small screens
- Touch-friendly buttons and inputs

---

## 🎨 Visual Indicators

### When Not Logged In
- Person icon in header (clickable)
- "Sign In" text in mobile menu
- Auth modal appears on click

### When Logged In
- Person icon shows user menu on click
- Dropdown with account options
- User's first name shown in menu
- Quick access to account features

---

## 🛠️ For Administrators

### Viewing All Users
- Admin panel doesn't currently show user list
- All user data stored in localStorage
- Key: `shop_users` contains all registered users
- Key: `shop_password_[email]` stores passwords

### Resetting User Data
Users can clear their data by:
1. Opening browser developer tools (F12)
2. Going to Application/Storage tab
3. Clearing localStorage for the site

Or administrators can guide users to:
- Clear browser cache and storage
- Use incognito/private mode for testing

---

## 💡 Tips for Users

### First Time Shopping
1. Create an account before checkout
2. Add your shipping address
3. Set it as default for faster checkout
4. Enjoy streamlined shopping experience

### Multiple Addresses
- Perfect for gifts (ship to friends)
- Work deliveries
- Vacation homes
- Family members

### Account Security
- Use a strong, unique password
- Don't share your login credentials
- Sign out on shared computers
- Keep your email up to date

---

## 🔄 Data Storage

### Where Data is Stored
All user data is stored in **browser localStorage**:
- `shop_users` - Array of all registered users
- `shop_currentUser` - Currently logged-in user
- `shop_password_[email]` - Individual passwords

### Persistence
- Data persists across sessions
- Survives page refreshes
- Cleared only when user clears browser data

### Browser Compatibility
- Works in all modern browsers
- Requires localStorage support
- No cookies used for authentication

---

## 🚀 Future Enhancements (Coming Soon)

### Planned Features
- [ ] Order history and tracking
- [ ] Wishlist/favorites functionality
- [ ] Password reset via email
- [ ] Two-factor authentication
- [ ] Social login (Google, Facebook)
- [ ] Order notifications
- [ ] Return/exchange management
- [ ] Loyalty points system

---

## 📞 Support

### Common Issues

**"I forgot my password"**
- Currently, passwords cannot be reset
- Create a new account with different email
- Or clear browser data to start fresh

**"My addresses disappeared"**
- Check if you cleared browser data
- localStorage data is browser-specific
- Data doesn't sync across devices

**"I can't log in"**
- Verify email and password are correct
- Check for typos
- Try creating a new account

**"How do I delete my account?"**
- Clear browser localStorage
- Or use incognito mode going forward
- No automatic account deletion yet

---

## ✅ Summary

Your website now has:
- ✅ User registration and login
- ✅ Profile management
- ✅ Multiple address storage
- ✅ Default address selection
- ✅ Session persistence
- ✅ Mobile-friendly interface
- ✅ Secure local storage
- ✅ Clean, intuitive UI

Users can now create accounts, save addresses, and enjoy a streamlined shopping experience!
