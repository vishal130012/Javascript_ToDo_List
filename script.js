const form = document.querySelector("#new-todo-form");
const textInput = document.querySelector("#todo-input");
const template = document.querySelector("#list-item-template");
const list = document.querySelector("#list");
const LOCAL_STORAGE_PREFIX = "ADVACNED_TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todo`;
const allItems = getData();
allItems.forEach((item) => showData(item));
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (textInput.value == "") return;
  const itemObj = {
    timekey: getUniqueNumber(),
    item: textInput.value,
    isChecked: false,
  };
  allItems.push(itemObj);
  showData(itemObj);
  saveData(allItems);
  textInput.value = "";
});
list.addEventListener("click", (evt) => {
  if (evt.target.matches("[data-button-delete]")) {
    const itemcode = evt.target.closest(".list-item").dataset.itemCode;
    const removedItem = allItems.find(
      (item) => Number(itemcode) === item.timekey
    );
    allItems.splice(allItems.indexOf(removedItem), 1);
    saveData(allItems);
    evt.target.closest(".list-item").remove();
  }
});
list.addEventListener("change", (evt) => {
  if (evt.target.matches("[data-list-item-checkbox]")) return;
  const isChecked = evt.target.closest("[data-list-item-checkbox]").checked;
  const itemCode = evt.target.closest("[data-item-code]").dataset.itemCode;
  const targetItem = allItems.find((item) => Number(itemCode) === item.timekey);
  isChecked ? (targetItem.isChecked = true) : (targetItem.isChecked = false);
  saveData(allItems);
});
function getUniqueNumber() {
  return new Date().getTime();
}
function showData({ timekey, item, isChecked }) {
  const cloneElement = template.content.cloneNode(true);
  cloneElement.querySelector(".list-item").dataset.itemCode = timekey;
  cloneElement.querySelector("span").textContent = item;
  isChecked
    ? (cloneElement.querySelector("[data-list-item-checkbox]").checked = true)
    : (cloneElement.querySelector("[data-list-item-checkbox]").checked = false);
  document.querySelector("#list").appendChild(cloneElement);
}
function saveData(allItems) {
  window.localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(allItems));
}
function getData() {
  const listItems = JSON.parse(window.localStorage.getItem(TODOS_STORAGE_KEY));
  return listItems || [];
}
