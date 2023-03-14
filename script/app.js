// Switch between Light and Dark theme - BUILDING
function changeDisplayLightDarkSwitch() {
    if ((document.getElementById("light-dark-text").className) == "bi bi-brightness-high-fill") {
        document.getElementById("light-dark-text").className = "bi bi-moon-fill";
        document.getElementById("light-dark-text").style.color = "white"

        let sideBar = document.querySelectorAll('.notes-side-bar');
        for (let i = 0; i < sideBar.length; i++) {
            sideBar[i].classList.replace('notes-side-bar', 'notes-side-bar-dark-mode');
            sideBar[i].style.color = '#fff'
        }

        let archivedBar = document.querySelectorAll('.archived-side-bar');
        for (let i = 0; i < archivedBar.length; i++) {
            archivedBar[i].classList.replace('archived-side-bar', 'notes-side-bar-dark-mode');
            sideBar[i].style.color = '#fff'
        }

        let notes = document.querySelectorAll('.note');
        for (let i = 0; i < notes.length; i++) {
            notes[i].classList.replace('note', 'note-dark-mode');
            notes[i].style.color = '#fff'; // Set the color of the text to white
        }

        let expandedNotes = document.querySelectorAll('.expanded-note');
        for (let i = 0; i < expandedNotes.length; i++) {
            expandedNotes[i].classList.replace('expanded-note', 'expanded-note-dark-mode');
            expandedNotes[i].style.color = '#fff'; // Set the color of the text to white
        }

        let expandedButtons = document.querySelectorAll('.btn');
        for (let i = 0; i < expandedButtons.length; i++) {
            expandedButtons[i].classList.replace('delete-button', 'btn-block-dark-mode');
            expandedButtons[i].style.color = '#fff'; // Set the color of the text to white
        }

        let footerClass = document.querySelectorAll('.footerClass')
        for (let i = 0; i < footerClass.length; i++) {
            footerClass[i].classList.replace('footerClass', 'footerClass-dark-mode')
        }

        let createNoteForm = document.querySelectorAll('.note-form')
        for (let i = 0; i < createNoteForm.length; i++) {
            createNoteForm[i].classList.replace('note-form', 'note-form-dark-mode')
        }

        document.body.style.backgroundColor = "#1a1a1a";

        let header = document.querySelector('.header');
        header.style.backgroundColor = "#1a1a1a";

    } else {
        document.getElementById("light-dark-text").className = "bi bi-brightness-high-fill";
        document.getElementById("light-dark-text").style.color = "#1a1a1a";
    
        let sideBar = document.querySelectorAll('.notes-side-bar-dark-mode');
        for (let i = 0; i < sideBar.length; i++) {
            sideBar[i].classList.replace('notes-side-bar-dark-mode', 'notes-side-bar');
            sideBar[i].style.color = '#1a1a1a'
        }
    
        let archivedBar = document.querySelectorAll('.archived-side-bar-dark-mode');
        for (let i = 0; i < archivedBar.length; i++) {
            archivedBar[i].classList.replace('notes-side-bar-dark-mode', 'archived-side-bar');
            archivedBar[i].style.color = '#1a1a1a'
        }
    
        let notes = document.querySelectorAll('.note-dark-mode');
        for (let i = 0; i < notes.length; i++) {
            notes[i].classList.replace('note-dark-mode', 'note');
            notes[i].style.color = '#333'; // Set the color of the text back to black
        }
    
        let expandedNotes = document.querySelectorAll('.expanded-note-dark-mode');
        for (let i = 0; i < expandedNotes.length; i++) {
            expandedNotes[i].classList.replace('expanded-note-dark-mode', 'expanded-note');
            expandedNotes[i].style.color = '#333'; // Set the color of the text back to black
        }

        let expandedButtons = document.querySelectorAll('.btn');
        for (let i = 0; i < expandedButtons.length; i++) {
            expandedButtons[i].classList.replace('btn-block-dark-mode', 'delete-button');
            expandedButtons[i].style.color = 'black'; // Set the color of the text to white
        }
    
        let footerClass = document.querySelectorAll('.footerClass-dark-mode')
        for (let i = 0; i < footerClass.length; i++) {
            footerClass[i].classList.replace('footerClass-dark-mode', 'footerClass')
        }
    
        let createNoteForm = document.querySelectorAll('.note-form-dark-mode')
        for (let i = 0; i < createNoteForm.length; i++) {
            createNoteForm[i].classList.replace('note-form-dark-mode', 'note-form')
        }
    
        document.body.style.backgroundColor = "#fff";
    
        let header = document.querySelector('.header');
        header.style.backgroundColor = "#f3f3f3";
    }
    
}

// Main functions available for the user
// Load the Notes
fetch("/notes")
    .then((res) => res.json())
    .then((notes) => {
        const noteContainer = document.querySelector(".note-container");
        const noteStatus = noteContainer.id
        notes.filter(note => note.status == noteStatus).forEach((note) => {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            let text = note.text;
            if (text.length > 400) {
                text = text.substring(0, 400) + "...";
            }
            noteElement.innerHTML = `
                <div class="row"> 
                    <div class="note-title">
                        <h3>${note.title}</h3>
                    </div>
                </div>
                <br>
                <div class="row"> 
                    <div class="note-text">
                        <p>${text}</p>
                    </div>
                </div>
            `;
            // Click to view a note on fullscreen
            noteElement.addEventListener("click", () => {
                if (document.body.classList.contains("expanded-note-open")) {
                    return;
                }
                const expandedNoteElement = document.createElement("div");
                let lightAndDarkMode = document.getElementById("light-dark-text").className
                if (lightAndDarkMode == "bi bi-brightness-high-fill") {
                    expandedNoteElement.classList.add("expanded-note");
                } else {
                    expandedNoteElement.classList.add("expanded-note-dark-mode");
                }
                expandedNoteElement.innerHTML = `
                <div class="row">
                    <div class="col-8 expanded-note-title" id="expanded-note-title">
                        <h2>${note.title}</h2>
                    </div>
                    <div class="note-actions col-4">
                        <button class="btn btn-block edit-note-button" id="edit-button"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-block delete-note-button" id="delete-button"><i class="bi bi-trash"></i></button>
                        <button class="btn btn-block archive-note-button" id="archive-button"><i class="bi bi-archive"></i></button>
                        <button type="button" class="close-button btn"><i class="bi bi-box-arrow-left"></i></button>
                    </div>
                </div>
                <div class="row">
                    <div class="expanded-note-text" id="expanded-note-text">${note.text}</div>
                </div>
                `;
                document.body.classList.add("expanded-note-open");
                document.body.appendChild(expandedNoteElement);
                const closeButton = document.querySelector(".close-button");
                closeButton.addEventListener("click", () => {
                    document.body.classList.remove("expanded-note-open");
                    expandedNoteElement.remove();
                });
                // Delete Note: event listener to the button
                const deleteButton = document.getElementById("delete-button");
                deleteButton.addEventListener("click", () => {
                    deleteNote(note._id, expandedNoteElement);
                });
                // Archive Note: event listener to the button
                const archiveButton = document.getElementById("archive-button");
                archiveButton.addEventListener("click", () => {
                    archiveNote(note._id, expandedNoteElement);
                });
                // Edit Note: event listener to the button
                const editButton = document.getElementById("edit-button");
                editButton.addEventListener("click", () => {
                    editNoteInput(note._id, note.text, note.title);
                });
            });
            noteContainer.appendChild(noteElement);
        });
    });
// Delete Note: Logic to delete the desired note
function deleteNote(id, expandedNoteElement) {
    fetch(`/notes/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((result) => {
            console.log("Deleted the following document:", result);
            document.body.classList.remove("expanded-note-open");
            expandedNoteElement.remove();
            location.reload()
        })
        .catch((error) => {
            console.error(error);
            alert("Error: note not deleted")
            location.reload()
        });

}
// Archive Note: Logic to update the "status" field of the note to "archived"
function archiveNote(id, expandedNoteElement) {
    fetch(`/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: "archived",
        }),
    })
        .then((res) => res.json())
        .then((result) => {
            console.log("Archived the following document:", result);
            document.body.classList.remove("expanded-note-open");
            expandedNoteElement.remove();
            location.reload();
        })
        .catch((error) => {
            console.error(error);
            alert("Error: note not archived");
            location.reload();
        });
}

// Edit Note: Logic to open an input with the note text to be edited
function editNoteInput(id, text, title) {
    // Create popup element
    const popup = document.createElement("div");
    popup.id = "edit-note-popup";
    popup.innerHTML = `
    <form class="expanded-note">
        <label for="note-title" style="font-size: 26px">Edit Title:</label>
        <input type="text" id="note-title" name="note-title" class="form-control" value="${title}" style="margin-bottom: 20px;">
        <textarea id="note-text" name="note-text" class="form-control" style="height: 90%;">${text}</textarea>
        <div class="d-flex justify-content-end mt-3">
            <button type="submit" class="btn btn-primary mx-2">Save</button>
            <button type="button" id="cancel-button" class="btn btn-secondary mx-2">Cancel</button>
        </div>
    </form>
`;
    // Add popup element to the page
    document.body.appendChild(popup);

    // Add event listener to the form submit button
    const form = popup.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const noteText = form.querySelector("#note-text").value;
        const noteTitle = form.querySelector("#note-title").value;
        if (noteText !== "") {
            fetch(`/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: noteTitle,
                    text: noteText
                }),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log("Edited the following document:", result);
                    popup.remove(); // Remove the popup element from the page
                    location.reload();
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error: note not edited");
                    popup.remove(); // Remove the popup element from the page
                    location.reload();
                });
        }
    });
    // Add event listener to the cancel button
    const cancelButton = popup.querySelector("#cancel-button");
    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        popup.remove(); // Remove the popup element from the page
    });
}



// Create notes: the pop-up window and its logic
function openCreateNoteWindow() {
    document.getElementById("note-overlay").style.display = "block";
    document.getElementById("note-form").style.display = "block";

    document.getElementById("submit-button").addEventListener("click", function (event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const text = document.getElementById("text").value;
        if (title == "" || text == "") {
            alert("A title and a text is necessary. Write down both of them")
            return undefined
        }
        const data = { title: title, text: text, status: "standard" };
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/createNotes", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
        xhr.onload = function () {
            if (xhr.status === 200) {
                alert("Data saved successfully");
                document.getElementById("note-overlay").style.display = "none";
                document.getElementById("note-form").style.display = "none";
                location.reload();
            } else {
                alert("Error saving data");
                location.reload();
            }
        };
    });

    document.getElementById("cancel-button").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("note-overlay").style.display = "none";
        document.getElementById("note-form").style.display = "none";
    });
}