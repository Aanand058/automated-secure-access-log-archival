
# Automated Secure Access Log Archival

## Project Description  
This project automates the daily download of access logs from a secure web portal and uploads them to a designated Google Drive folder. The automation is implemented using Google Apps Script, leveraging Google Drive API for file management and URL Fetch for secure downloads. It enhances operational efficiency by eliminating manual intervention and ensures timely availability of logs for analysis.

---

## Setup Instructions

1. **Clone or download the repository.**

2. **Create a Google Sheet** to serve as the log and dashboard (or use the provided template).  
   - Note the Sheet ID from the URL.

3. **Configure Google Apps Script:**  
   - Open the script editor (Extensions → Apps Script) in your Google Sheet.  
   - Copy the script files or import from the repo.  
   - Update script constants with:  
     - Google Drive folder ID to upload files.  
     - Credentials or tokens for accessing the secure portal.  
     - Google Sheet ID for logging.

4. **Authorize the script:**  
   - Run the functions to trigger OAuth consent for Google Drive access and logging.

5. **Set up Triggers:**  
   - In the Apps Script editor, create a **time-driven trigger** (e.g., daily at a set time) to run the download function automatically.

6. **(Optional) Customize the UI:**  
   - Use the provided custom menu and sidebar code to enable manual triggers and status viewing.

---

## Dependencies

- **Google Apps Script**  
- **Google Drive API** (enabled via Apps Script)  
- **URL Fetch Service** (for HTTP requests to the secure portal)  
- Optional: OAuth 2.0 credentials if the portal requires token-based authentication

---

## Limitations

- The portal’s authentication must be compatible with Apps Script URL Fetch or alternative APIs. Complex logins requiring browser automation may need external tools.  
- Google Apps Script has execution time limits (typically 6 minutes), so very large files or slow servers may cause timeouts.  
- Manual export/import of code may be needed if Apps Script is updated outside GitHub.

---

## Example Access Log File Content (CSV)

This is a sample of the typical access log data read from the downloaded CSV files. The automation parses and processes these records for storage and analysis.

| Id    | Date       | EventCode | NotificationType | LogType  | CustomerId | CustomerName | ProximityCard | DoorId | DoorName        | ApartmentId |
|-------|------------|-----------|------------------|----------|------------|--------------|---------------|--------|-----------------|-------------|
| 10001 | 2025-06-07 | EV123     | Entry            | Access   | C001       | John Smith   | PC123456      | D12    | Main Entrance   | A101        |
| 10002 | 2025-06-07 | EV124     | Exit             | Access   | C002       | Jane Doe     | PC654321      | D12    | Main Entrance   | A102        |
| 10003 | 2025-06-07 | EV125     | Access Denied    | Alert    | C003       | Bob Johnson  | PC789012      | D07    | Parking Garage  | A103        |

---

## Contributing

Contributions, issues, and feature requests are welcome. 

## Contact

Feel free to check out the project and reach out by email for any questions or collaboration opportunities:

📧 [Email Me](mailto:yamit058@gmail..com)



