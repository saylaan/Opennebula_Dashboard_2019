Rest : Respresentational State Trasnfer
--> Use it to transfer data around
xxx URL with http request (get, post, delete, patch...)
and the client make AJAX request (async)
The data transfer is made in XML / JSON / URLencoded / FormData.
But everything is made in backgroud. The client dont use the URL to send data.
Only way to connect to the backend.
Constraints :
-Shouldn't care of UI
-No Client-Context
-cacheable resp or non-cacheable
-intermediate Server maybe used
-rsc are identified in req, transferred data is decoupled from db schema
-self-descriptive message (link endpoint for not guessing data)
-Executable code could be transferred
It a good way to design the API first for then understand well the differents route to made (which one lock from the user)
