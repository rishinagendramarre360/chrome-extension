let myleads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"))
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


if (leadsfromlocalstorage) {
    myleads = leadsfromlocalstorage
    render(myleads)
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myleads = []
    render(myleads)
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentwindow: true}, function(tabs) {
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)
    })
})

inputBtn.addEventListener("click", function() {

    myleads.push(inputEl.value)
    localStorage.setItem("myleads", JSON.stringify(myleads) )
    render(myleads)
    inputEl.value = ""
})

function render(leads) {
    let list = ""
    for (let i = 0; i < leads.length; i++) {
        list += `
        <li>
          <a href='${leads[i]}' target='_blank'>
             ${leads[i]}
          </a>
        </li>
        `
    }
    ulEl.innerHTML = list
}





