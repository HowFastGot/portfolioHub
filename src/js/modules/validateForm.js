import { findDOM_node } from "./findDOM_node.js";

function createNotificationElement(message) {
     const notification = document.createElement('span');
     notification.classList.add('reg-notification');
     notification.textContent = message;
     return notification;
}

function changeLabelColor(inputElement) {
     const label = inputElement.previousElementSibling.previousElementSibling;

     inputElement.style.color = "red";
     label.style.color = "red";
     setTimeout(() => {
          inputElement.style.color = "";
          label.style.color = "";
     }, 2000);
}

function deleteNotificationElement() {

     setTimeout(() => {
          findDOM_node(".reg-notification").remove();
     }, 2000);

}

function addNotification(inputElement, message) {

     const visibleNotification = findDOM_node(".reg-notification");

     if (visibleNotification) return;

     const notification = createNotificationElement(message);
     inputElement.parentNode.insertBefore(notification, inputElement);
     changeLabelColor(inputElement);

     deleteNotificationElement();
}

const setValidateUserName = (e) => {
     const inputElement = e.target;
     const newChar = e.data;
     const regExp = /^[a-zA-Zа-яА-Яії\s]{1,}$/i;

     if (inputElement.value.length === 0) {
          inputElement.value = "";
     } else {

          if (regExp.test(newChar)) {
               const firstLetterUp = inputElement.value.slice(0, 1).toUpperCase() + inputElement.value.slice(1);
               inputElement.value = firstLetterUp;
          } else {
               const indexOfNewChar = inputElement.value.indexOf(newChar);

               inputElement.value = inputElement.value.slice(0, indexOfNewChar) + inputElement.value.slice(indexOfNewChar + 1);
               inputElement.focus();
               addNotification(inputElement, "Write your name!");
          }
     }
}

const checkUserEmail = (e) => {
     const inputElement = e.target;
     const email = inputElement.value?.trim();
     const regExpEmail = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;


     if (email.length === 0) {
          inputElement.value = "";
     } else if (regExpEmail.test(email)) {
          inputElement.value = email;
     } else {
          addNotification(inputElement, "Write the correct email!")
          inputElement.focus();
     }
}


export function validateForm() {
     const nameInput = document.getElementById('name');;
     const emailInput = document.getElementById('email');


     nameInput.addEventListener("input", setValidateUserName);
     emailInput.addEventListener("blur", checkUserEmail);

}