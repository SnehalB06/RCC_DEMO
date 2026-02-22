# Role-Based System Implementation - January 22, 2026

## Overview

Implemented 4 distinct roles with 4 unique functionalities each in the RCC Timesheet System. Each role now has a dedicated dashboard with role-specific features and capabilities.

---

## 1️⃣ ADMIN ROLE - System Administrator

### Dashboard: `/admin` → Admin Panel

#### Functionality 1: User Management

- **View all users** with advanced search/filter by role and status
- **Create new users** (via registration API)
- **Edit users** - Update name, email, phone, role, status
- **Delete users** - Remove users from system
- **Activate/Deactivate users** - Toggle user status
- **Search & filter** - By employee ID, name, email, role

**Components:**

- `AdminUserManagement.js` - Full CRUD operations for users
- Modal dialog for editing user details
- Status badges (ACTIVE/INACTIVE)
- Role badges (ADMIN/PM/CLIENT/EMPLOYEE)

#### Functionality 2: System Reports

- **Users by Role** - Count of users in each role
- **Timesheets by Status** - Count of PENDING/APPROVED/REJECTED
- **Hours Statistics** - Total hours worked, average per employee
- **Export capabilities** - Download as CSV or print

**Components:**

- `AdminReports.js` - Analytics and reporting dashboard
- Statistical cards with key metrics
- Export and print buttons

#### Functionality 3: System Settings

- **General Settings** - System name configuration
- **Timesheet Configuration** - Max hours/week, auto-lock days
- **Notification Settings** - Manager notifications, employee notifications
- **System Status** - Database connection, API server, last backup

**Components:**

- `AdminSettings.js` - Configuration management interface
- Settings saved to localStorage (can extend to backend)
- Real-time configuration updates

#### Functionality 4: Dashboard Metrics

- **Stats Cards** showing:
  - Total Users
  - Active Users
  - Total Timesheets
  - Pending Approvals (highlighted)

**Page:**

- `AdminPanel.js` - Main admin dashboard with tabs

---

## 2️⃣ EMPLOYEE ROLE - Regular Employee

### Dashboard: `/timesheet` → Daily Timesheet Management

#### Functionality 1: Fill Own Timesheet

- Fill daily hours (14-day biweekly period)
- Add project information per day
- Add notes/comments
- Edit individual days
- View daily breakdown

**Components:**

- `DailyTimesheetCard.js` - Daily hour entry interface
- Pagination through 14-day period
- Day editing modal

#### Functionality 2: View Timesheet History

- **TimesheetsList.js** - See all submitted timesheets
- Filter by month/year
- View hours worked, project, status
- See approval status
- Track timesheet submissions

**Components:**

- `TimesheetsList.js` - Historical timesheet list
- Status badges
- Date formatting
- Hours display

#### Functionality 3: Submit for Approval

- Click "Submit" button on timesheet
- System validates hours
- Changes status to "PENDING"
- Sends notification to manager

**Components:**

- Submit button in `DailyTimesheetCard.js`
- API call to `updateTimesheet()`
- Status change to PENDING

#### Functionality 4: View Personal Summary

- **Home Dashboard Stats:**
  - Employee ID
  - Number of timesheets submitted
  - Total hours logged
  - Average hours per timesheet
- Personal charts showing:
  - Daily hours trend (last 30 days)
  - Hourly breakdown

**Components:**

- Home page stats cards (role-specific)
- `DailyHoursChart.js` - Personal hours trend

---

## 3️⃣ PM ROLE - Project Manager

### Dashboard: `/pm-dashboard` → Project Manager Dashboard

#### Functionality 1: View Team Timesheets

- See all team member timesheets (read-only view)
- Filter by status (PENDING, APPROVED, REJECTED)
- Display as cards showing:
  - Employee name and ID
  - Period (month/year)
  - Hours worked
  - Project assigned
  - Submission date
  - Current status

**Components:**

- `PMTeamTimesheets.js` - Card-based timesheet display
- Status filter dropdown
- Employee information display

#### Functionality 2: Approve/Reject Timesheets

- **View pending timesheets list**
- See employee details and hours
- Approve button - Changes status to "APPROVED"
- Reject button - Changes status to "REJECTED"
- Action buttons disable during processing

**Components:**

- `PMApprovals.js` - Approval interface
- Pending timesheets counter
- Approve/Reject action buttons
- Employee information display
- Notes section

#### Functionality 3: Team Performance Reports

- **Team Statistics:**
  - Average hours per team member
  - Submission rate (%)
  - Top performers by hours
  - Team members table showing:
    - Total hours
    - Average hours
    - Submitted count
    - Approved count
    - Approval rate %

**Components:**

- `PMTeamReports.js` - Team analytics
- Summary statistics
- Detailed team table
- Top performers ranked list

#### Functionality 4: Dashboard Metrics

- **Stats Cards:**
  - Team Members count
  - Submitted Timesheets count
  - Pending Approvals (highlighted)
  - Total Team Hours

**Page:**

- `PMDashboard.js` - Main PM dashboard with 3 tabs

---

## 4️⃣ CLIENT ROLE - Client/Manager

### Dashboard: `/client-dashboard` → Client Dashboard

#### Functionality 1: View Billable Hours

- See total billable hours from approved timesheets only
- **Hourly rate:** $50/hour (configurable)
- Project-wise breakdown:
  - Project name
  - Hours worked
  - Rate per hour
  - Total cost
- Summary cards showing:
  - Total billable hours
  - Total billing amount

**Components:**

- `ClientBillingView.js` - Billing summary interface
- Billing summary cards
- Project-wise billing table
- Hourly rate display

#### Functionality 2: Billing Summary & Invoicing

- **Billing by Project Table:**
  - Project name
  - Total hours
  - Hourly rate
  - Total cost per project
  - Grand total row
- Export invoice button
- Email invoice button
- Print button

**Components:**

- `ClientBillingView.js` - Invoice-ready display
- Summary cards with calculations
- Project table with totals

#### Functionality 3: Detailed Reports

- **Hours by Employee:**
  - Employee name
  - Total hours worked
  - Total cost
  - Number of timesheets
  - Projects assigned
  - Table format with sorting
- **Hours by Project:**
  - Project name
  - Total hours
  - Total cost

**Components:**

- `ClientReportView.js` - Comprehensive reporting
- Employee-wise report table
- Project-wise report table
- Period summary stats

#### Functionality 4: Dashboard Metrics

- **Stats Cards:**
  - Total Billable Hours
  - Estimated Cost (highlighted in blue)
  - Projects count
  - Invoices count (estimated)

**Page:**

- `ClientDashboard.js` - Main client dashboard with 2 tabs

---

## Navigation & Access Control

### Role-Based Navigation (Navbar)

| Role         | Icon | Navigation              | Accessible Routes    |
| ------------ | ---- | ----------------------- | -------------------- |
| **ADMIN**    | ⚙️   | Home → Admin Panel      | /, /admin            |
| **PM**       | 👨‍💼   | Home → PM Dashboard     | /, /pm-dashboard     |
| **CLIENT**   | 👔   | Home → Client Dashboard | /, /client-dashboard |
| **EMPLOYEE** | 👤   | Home → Timesheet        | /, /timesheet        |

### Automatic Redirects

- **Admin login** → Auto-redirects `/` to `/admin`
- **PM login** → Auto-redirects `/` to `/pm-dashboard`
- **Client login** → Auto-redirects `/` to `/client-dashboard`
- **Employee login** → Stays on `/` or goes to `/timesheet`

### Route Protection

- Each dashboard has specific route guard
- Non-authorized users redirected to home
- Admin users cannot access PM/Client dashboards

---

## File Structure

### Pages (Frontend)

```
frontend/src/pages/
├── AdminPanel.js          ← Admin dashboard
├── PMDashboard.js         ← PM dashboard
├── ClientDashboard.js     ← Client dashboard
├── Timesheet.js           ← Employee timesheet (existing)
├── Home.js                ← Updated with role-based redirects
└── App.js                 ← Updated with new routes
```

### Components (Frontend)

**Admin:**

```
frontend/src/components/Admin/
├── AdminUserManagement.js
├── AdminReports.js
└── AdminSettings.js
```

**PM:**

```
frontend/src/components/PM/
├── PMTeamTimesheets.js
├── PMApprovals.js
└── PMTeamReports.js
```

**Client:**

```
frontend/src/components/Client/
├── ClientBillingView.js
└── ClientReportView.js
```

**Updated Components:**

```
frontend/src/
├── components/Navbar.js        ← Role-specific navigation
└── context/AuthContext.js      ← Role checking functions
```

---

## API Endpoints Used

### Admin Operations

- `GET /api/admin` - Fetch all users
- `PATCH /api/admin/:employeeId` - Update user
- `DELETE /api/admin/:employeeId` - Delete user
- `GET /api/timesheets/all` - Fetch all timesheets
- `PATCH /api/timesheets/approve/:employeeId/:month/:year` - Approve timesheet
- `PATCH /api/timesheets/reject/:employeeId/:month/:year` - Reject timesheet

### PM Operations

- `GET /api/timesheets/all` - View team timesheets
- `PATCH /api/timesheets/approve/:employeeId/:month/:year` - Approve
- `PATCH /api/timesheets/reject/:employeeId/:month/:year` - Reject
- `GET /api/admin` - Get team members list

### Client Operations

- `GET /api/timesheets/all` - View approved timesheets (read-only)
- `GET /api/admin` - Get employee information

### Employee Operations

- `GET /api/timesheets/:employeeId/:month/:year` - Get own timesheet
- `PATCH /api/timesheets/daily/:employeeId/:month/:year` - Update daily hours
- `PUT /api/timesheets/update/:employeeId/:month/:year` - Submit timesheet
- `GET /api/timesheets/all` - View own timesheets in list

---

## Key Features by Role Summary

| Feature             | Admin | Employee | PM  | Client             |
| ------------------- | ----- | -------- | --- | ------------------ |
| Manage Users        | ✅    | ❌       | ❌  | ❌                 |
| View All Timesheets | ✅    | ❌       | ✅  | ✅ (approved only) |
| Fill Own Timesheet  | ✅    | ✅       | ✅  | ❌                 |
| Submit Timesheets   | ✅    | ✅       | ✅  | ❌                 |
| Approve/Reject      | ✅    | ❌       | ✅  | ❌                 |
| View Team Reports   | ✅    | ❌       | ✅  | ❌                 |
| View Billing        | ✅    | ❌       | ❌  | ✅                 |
| View Personal Stats | ✅    | ✅       | ✅  | ✅                 |
| System Settings     | ✅    | ❌       | ❌  | ❌                 |

---

## Authentication Flow

```
1. Login Page
   ↓
2. Enter Employee ID + Password
   ↓
3. Backend validates credentials
   ↓
4. Returns user with role (ADMIN/PM/CLIENT/EMPLOYEE)
   ↓
5. Home page checks role
   ↓
6. Auto-redirects to appropriate dashboard
   ↓
7. Navbar displays role-specific navigation
```

---

## Testing Checklist

### Admin User

- [ ] Login as admin
- [ ] Can access Admin Panel
- [ ] Can search/filter users
- [ ] Can edit user information
- [ ] Can activate/deactivate users
- [ ] Can delete users
- [ ] Can view system reports
- [ ] Can view and modify settings
- [ ] Can view dashboard metrics

### Employee User

- [ ] Login as employee
- [ ] Can access Timesheet page
- [ ] Can enter daily hours
- [ ] Can submit timesheet
- [ ] Can view timesheet history
- [ ] Can see personal stats
- [ ] Cannot access other dashboards
- [ ] Navbar shows correct links

### PM User

- [ ] Login as PM
- [ ] Can access PM Dashboard
- [ ] Can view team timesheets
- [ ] Can approve timesheets
- [ ] Can reject timesheets
- [ ] Can view team reports
- [ ] Can see team performance metrics
- [ ] Navbar shows correct links

### Client User

- [ ] Login as client
- [ ] Can access Client Dashboard
- [ ] Can view billable hours (approved only)
- [ ] Can see project-wise billing
- [ ] Can view detailed reports
- [ ] Can see dashboard metrics
- [ ] Cannot edit timesheets
- [ ] Navbar shows correct links

---

## Styling

### CSS Classes Added

- `.admin-panel` - Admin dashboard main container
- `.pm-dashboard` - PM dashboard main container
- `.client-dashboard` - Client dashboard main container
- `.role-badge` - Role identifier badge
- `.status-badge` - Status indicator
- Various component-specific classes

### Role-Specific Styling

- `role-admin` / `role-employee` / `role-pm` / `role-client`
- Color coding based on role
- Icon differentiation in navigation

---

## Future Enhancements

1. **Team Assignment** - Admins assign employees to PMs
2. **Project Management** - PM can create and manage projects
3. **Email Notifications** - Send emails on approval/rejection
4. **Audit Logging** - Track all user actions
5. **Role-Based API** - Backend API endpoints with role checking
6. **Bulk Operations** - Admin bulk user actions
7. **Advanced Reports** - Charts, graphs, trend analysis
8. **Export Formats** - PDF, Excel, CSV options
9. **Custom Hourly Rates** - Different rates per project/employee
10. **Timesheet Locking** - Auto-lock after approval
