# Support Ticket API

Note: This is a class project, but I’ll attempt to do it on my own.

require: Node 22+

### Overview

API to manage technical support tickets, allowing users to create a ticket requesting support, update ticket information, list tickets with optional status filtering, and update a ticket's status to closed.

### Endpoints

-  **Create Ticket**

   Creates a new support ticket.

   **Method:** POST

   **URL:** `/tickets`

   **Payload:**

   -  `equipment` (string, required): Name of the equipment (e.g., computer).
   -  `description` (string, required): Description of the issue.
   -  `user_name` (string, required): Name of the user creating the ticket.

-  **Get Tickets**

   **Method:** GET

   **URL:** `/tickets`

   **Description:** Retrieves a list of all support tickets.

   **Query Parameters:**

   -  `status` (string, optional): Filters tickets by status ("open" or "closed").

-  **Update Ticket**

   **Method:** PUT

   **URL:** `/tickets/:id`

   **Description:** Updates the details of a specific ticket.

   **Route Parameters:**

   -  `id` (UUID, required): ID of the ticket.

   **Body Parameters (JSON):**

   -  `equipment` (string, required): Name of the equipment (e.g., computer).
   -  `description` (string, required): Description of the issue.
   -  `user_name` remains unchanged.

-  **Close Ticket**

   **Method:** PATCH

   **URL:** `/tickets/:id/status`

   **Description:** Updates the status of a specific ticket to closed.

   **Route Parameters:**

   -  `id` (UUID, required): ID of the ticket.

-  **Delete Ticket**
   **Method:** DELETE
   **URL:** `/tickets/:id`
   **Description:** Deletes a specific ticket by its ID.
   **Route Parameters:**
   -  `id` (UUID, required): ID of the ticket.
