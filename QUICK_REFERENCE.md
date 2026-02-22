# Quick Reference: New Features

## 1. Updated Login Flow

### Old Flow:

```
Employee enters ID → System finds user → Auto login
```

### New Flow:

```
Employee enters ID + Password → System validates password → Login
```

### Testing:

1. Go to `/login` page
2. Enter Employee ID
3. Enter Password
4. Click Login

---

## 2. Updated Registration Flow

### New Fields:

- Gender (dropdown: Male, Female, Other)
- Password (min 6 characters)
- Confirm Password (must match)

### Testing:

1. Go to `/register` page
2. Fill all fields including gender and password
3. Click "Create Account"
4. Should auto-login and redirect to home

---

## 3. Role-Based Timesheet Access

### Access Levels:

| Role     | Can View Own | Can View All | Can Approve |
| -------- | ------------ | ------------ | ----------- |
| EMPLOYEE | ✓            | ✗            | ✗           |
| PM       | ✓            | ✓            | ✓           |
| CLIENT   | ✓            | ✓            | ✓           |
| ADMIN    | ✓            | ✓            | ✓           |

### Testing EMPLOYEE:

1. Login as employee
2. Go to /timesheet
3. Should see "My Timesheets" title
4. Should only see their own timesheets
5. Selection panel should NOT be visible

### Testing ADMIN/PM/CLIENT:

1. Login as admin/PM/client
2. Go to /timesheet
3. Should see "Timesheet Management" title
4. Should see all employee timesheets
5. Selection panel SHOULD be visible
6. Can select different employees or leave blank to work on own

---

## 4. Admin/PM/Client Can Fill Own Timesheet

### How It Works:

- If they enter their own employee ID → Works as expected
- If they leave employee ID blank → Defaults to their own ID
- Allows them to track their own hours while managing others

### Testing:

1. Login as admin
2. Go to /timesheet → Daily Tracker tab
3. Don't select any employee ID
4. Should load THEIR timesheet (not an error)
5. Can enter hours and submit

---

## 5. Password Security

### Features:

- Passwords hashed with bcrypt (10 salt rounds)
- Passwords never returned in API responses
- Minimum 6 character requirement
- Password and confirm password must match on registration

### Testing:

1. Try registering with password < 6 characters → Error
2. Try registering with mismatched passwords → Error
3. Try login with wrong password → "Invalid password" error
4. Check browser DevTools → Password never appears in API responses

---

## API Endpoints Reference

### Authentication:

- **POST /api/admin/login** - Login with ID + password

  ```json
  {
    "employeeId": "E001",
    "password": "password123"
  }
  ```

- **POST /api/admin** - Register new user
  ```json
  {
    "employeeId": "E002",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "gender": "MALE",
    "password": "password123",
    "role": "EMPLOYEE"
  }
  ```

### User Management:

- **GET /api/admin** - Get all users (no passwords)
- **GET /api/admin/:employeeId** - Get single user (no password)
- **POST /api/admin** - Create new user (with hashed password)
- **PATCH /api/admin/:employeeId** - Update user
- **DELETE /api/admin/:employeeId** - Delete user

---

## Known Limitations

1. **Existing Users**: Users already in the database don't have passwords/gender
   - Need migration to add these fields
   - Can either regenerate accounts or add default values

2. **Password Reset**: No password reset feature implemented yet
   - Would need additional email/token functionality

3. **Password Change**: No password change endpoint implemented yet
   - Users can only change via admin update endpoint

---

## Next Steps (Optional Enhancements)

1. **Password Reset Flow**
   - Add /forgot-password endpoint
   - Send reset token via email
   - Validate and update password

2. **Profile Update**
   - Allow users to change their own password
   - Allow users to view/update their profile
   - Add profile photo/avatar support

3. **Two-Factor Authentication**
   - Add OTP for login
   - Add security questions

4. **Audit Logging**
   - Track who approved/rejected timesheets
   - Track who modified timesheet data
   - Log all authentication events

5. **Email Notifications**
   - Notify when timesheet is submitted
   - Notify when timesheet is approved/rejected
   - Send password reset emails
