```mermaid
erDiagram
    NotificationPreference ||--|| User : notification_preference
    NotificationPreference ||--|| User : email_notification_preference
    GeneralPreference ||--|| User : general_preference
    File }o--|| Ticket : attached_files
    Ticket }o--|| User : belong_to
    User ||--o| ForgetPassword : forget_password_code
    User ||--o| File : profile_photo
    User ||--o{ Session : sessions


```
