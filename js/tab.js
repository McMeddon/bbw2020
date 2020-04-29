/** Opens a Tab which is defined in html code refered by the id - which is given as 'tab' argument */
function openBasicTab(event, tab) {
  hideall();
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab).style.display = "block";
  event.currentTarget.className += " active";
}

/** Overides a dynamicTab Items(title and description with given arguments) and opens the dynamicTab  */
function openDynamicTab(event, title, desc) {
  hideall();

  // Show the current tab, and add an "active" class to the button that opened the tab

  document.getElementById("basicTabTitle").innerText = title;
  document.getElementById("basicTabDescription").innerText = desc;
  document.getElementById("basicTab").style.display = "block";
  event.currentTarget.className += " active";
}

function hideall() {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
}
