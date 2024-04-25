"use strict";

class RemovedItem {
    constructor(element, nextSibling, listOl) {
        this.element = element;
        this.nextSibling = nextSibling;
        this.listOl = listOl;
    }
}

let lastRemovedItem = null; // let bo ciągle się będzie zmieniać

const adder = () => {
    const input = document.getElementById("inputField");
    const listSelect = document.getElementById("listSelector");

    if (input.value === "") {
        console.log("Input is empty");
        const modal = document.getElementById("my-modal");
        modal.showModal();
        return;
    }

    const inputValue = input.value;
    const listId = listSelect.value;
    const theList = document.getElementById(listId);
    const listItem = document.createElement("li");
    const contentSpan = document.createElement("span");
    const timeSpan = document.createElement("span"); // Span for time
    timeSpan.className = "time-done";

    contentSpan.textContent = inputValue;
    listItem.appendChild(contentSpan);
    listItem.appendChild(timeSpan);
    DeleteButton(listItem, inputValue, theList);
    ToggleEvent(listItem);

    theList.querySelector('ol').appendChild(listItem);
    input.value = "";
}

function DeleteButton(listItem, inputValue, list) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.style.color = "red";
    deleteButton.onclick = function (event) {
        event.stopPropagation();
        const modal = document.getElementById('confirm-delete-modal');
        const taskContent = document.getElementById('task-content');
        taskContent.textContent = inputValue;

        modal.showModal();

        document.getElementById('confirm-delete').onclick = function () {
            const listOl = list.querySelector('ol');
            lastRemovedItem = new RemovedItem(listOl.removeChild(listItem), listItem.nextSibling, listOl);
            modal.close();
        };

        document.getElementById('cancel-delete').onclick = function () {
            modal.close();
        };
    };
    listItem.append(deleteButton);
}

function ToggleEvent(listItem) {
    listItem.addEventListener("click", function() {
        this.classList.toggle('done');
        const timeSpan = this.querySelector('.time-done');
        if (this.classList.contains('done')) {
            const currentTime = new Date().toLocaleTimeString();
            timeSpan.textContent = ' Zakończono o: ' + currentTime;
        } else {
            timeSpan.textContent = '';
        }
    });
}

function undoRemoval() {
    if (lastRemovedItem) {
        const { element, nextSibling, listOl } = lastRemovedItem;
        listOl.insertBefore(element, nextSibling);
        lastRemovedItem = null;
    } else {
        console.log("Brak elementu do przywrócenia!");
    }
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
        undoRemoval();
    }
});

function toggleList(listId) {
    const list = document.getElementById(listId).querySelector('ol');
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

window.onload = () => {

    const closingButton = document.getElementById("closing");
    closingButton.addEventListener("click", () =>{

        const modal = document.getElementById("my-modal");
        modal.close();
    });
}

