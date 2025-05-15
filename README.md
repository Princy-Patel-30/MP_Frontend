Project Definition: Service Booking Platform
User Types:(3 Roles)
Admin: Manages users, service providers, and services.
Service Provider: Creates, updates, deletes services, accepts service requests, and manages bookings.
Consumer (End User): Registers/logs in to book services, view bookings, and cancel services.

Schemas (Variable Based on Requirements)
Users Schema: Stores user details, roles, and service-related activities.
Bookings Schema: Captures booking details, status, and timestamps.
Services Schema: Defines services, provider details, costs, availability, category, and sub-category.
Reviews/Comments Schema: Manages user feedback and ratings.

General Instructions for All Platforms
General Layout of Page
Navbar for Easy navigation across the application
Footer 
Initial Landing Page
User Landing Page: Displays company information with links to service listings and contact pages.
Service Provider Landing Page: Displays service management, request acceptance/rejection, and cancellation options.
Admin Landing Page: Provides a dashboard for service and user management.

1.Admin Panel
1.1 Users Module
Add User Form: Allows admin to register users with roles.
User List: Displays user details with search and filter options.
Update User Form: Enables editing of user details.
Delete User Modal: Confirmation-based user removal.
Search & Filter Users: Find users by name, email, or role.
User Details: Displays requested, accepted, and active services.
1.2 Services Module
Add Service Form: Input details like name, description, cost, category, sub-category, and provider ID.
Service List: Overview of all services.
Update Service Form: Allows modification of service details.
Delete Service Modal: Provides confirmation before removal.
Search & Filter Services: Search by name/description and filter by category, sub-category, or cost range.

2. User Panel
2.1 Service Management
Service Listing: Browse available services with details.
Search & Filter Services: Sort by name, category, sub-category, or price.
Service Details: View descriptions, provider details, pricing, and availability.
Service Booking: Requires login before booking.
Booking Management: Allows users to view, cancel, and rate booked services.
User Profile: Manage personal details and passwords.
Service Reviews & Ratings: Submit feedback for completed services.

3. Service Provider Panel
3.1 Service & Booking Management
Requested Services: View service requests matching expertise.
Accepted Services: Manage booked services.
Manage Services: View, update, delete, or create new services.
Service Acceptance: Accept or decline service requests.
Service Completion: Mark services as completed and receive feedback.
Profile Management: Update personal details and expertise.
Reviews & Ratings: View and respond to user feedback.
