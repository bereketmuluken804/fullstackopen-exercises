```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes note and clicks "Save"
    Note right of browser: JavaScript adds the new note to the local list and rerenders the note list on the page

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The data is sent as JSON: { "content": "Note in SPA", "date": "2024-5-9" }
    server-->>browser: HTTP status code 201 (Created)
    deactivate server

    Note left of server: The server confirms the note was saved; no redirect is needed
```
