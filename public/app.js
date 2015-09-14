var rootUrl = null;

function getDocument(path, cb) {
  var templateXHR = new XMLHttpRequest();
  templateXHR.responseType = "document";
  templateXHR.addEventListener("load", function() {
    var doc = templateXHR.responseXML;
    pushDoc(doc);
    cb(doc);
  }, false);
  templateXHR.open("GET", rootUrl + path, true);
  templateXHR.send();
  return templateXHR;
}

function alert(str) {
  var alertXMLString = "<?xml version='1.0' encoding='UTF-8' ?>" +
  "<document>" +
    "<alertTemplate>" +
      "<title>Hey Listen!</title>" +
      "<description>" + str + "</description>" +
      "<button>" +
        "<text>OK</text>" +
      "</button>" +
    "</alertTemplate>" +
  "</document>";
  var parser = new DOMParser();
  var alertDOMElement = parser.parseFromString(alertXMLString, "application/xml");
  navigationDocument.presentModal(alertDOMElement);
}

function pushDoc(document) {
  navigationDocument.pushDocument(document);
}

function bindListItemSelection(doc, tagName, selection) {
  var itemElements = doc.getElementsByTagName(tagName);
  for (var i = 0; i < itemElements.length; i++) {
    var element = itemElements.item(i);
    element.addEventListener("select", selection, false);
  }
}

function sectionSelection(e) {
  showVideoSection(e.target.getAttribute('data-id'));
}

function showSections() {
  getDocument('/sections', function (doc) {
    bindListItemSelection(doc, "lockup", sectionSelection);
  });
}

function videoSelection(e) {
  showVideo(e.target.getAttribute('data-id'));
}

function showVideoSection(id) {
  getDocument('/sections/' + id, function (doc) {
    bindListItemSelection(doc, "listItemLockup", videoSelection);
  });
}

function showVideo(id) {
  getDocument('/videos/' + id, function (doc) {

  });
}

App.onLaunch = function(options) {
  rootUrl = options.rootUrl;
  showSections();
};

App.onExit = function() {
  console.log('App finished');
};
