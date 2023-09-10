![Class Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/Zingam/Markdown-Document-UML-Use-Test/master/UML/Instance.puml)
@startuml
actor User
actor 
actor System
rectangle "Account Management" {
  User --> (User Registration)
  User --> (User Login)
  User --> (Password Recovery)
  User --> (Password Reset)
  User --> (User Profile Management)
}
rectangle "Ticket Management" {
  User --> (Create Ticket)
  User --> (View Ticket)
  User --> (Update Ticket)
  User --> (Close Ticket)
  User --> (Prioritize Ticket)
  User --> (Categorize Ticket)
  User --> (Assign Ticket)
  System --> (Create Ticket)
  System --> (View Ticket)
  System --> (Update Ticket)
  System --> (Close Ticket)
  System --> (Prioritize Ticket)
  System --> (Categorize Ticket)
  System --> (Assign Ticket)
}
rectangle "Session Management" {
  User --> (Secure Session Handling)
  User --> (View Active Sessions)
  User --> (Remote Logout)
}
rectangle "Virtual Assistant" {
  User --> (Implement Chatbot)
}
rectangle "Notifications" {
  User --> (Send Email Notifications)
  User --> (Customize Notification Preferences)
}
rectangle "Permission" {
  User --> (Define User Roles)
  User --> (Manage User Permissions)
  User --> (Role-Based Access Control)
}
User --> (Define User Roles)

@enduml
