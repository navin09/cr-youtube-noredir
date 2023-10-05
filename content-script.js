function fixRedirects(node) {
  let theLink = node.href;
  let query = new URLSearchParams(theLink);
  let redirUrl = query.get("q");
  node.href = redirUrl;
  let redirQuery = new URL(redirUrl);
  node.title = redirQuery.hostname;
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    var nodes = document.querySelectorAll(
      "a[href^='https://www.youtube.com/redirect'"
    );
    for (var node in nodes) {
      fixRedirects(node);
    }
  }
};

let observer = new MutationObserver(function (mutations) {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      if (
        addedNode.nodeName === "A" &&
        addedNode.hasAttribute("href") &&
        addedNode.href.match(new RegExp("^https://www.youtube.com/redirect"))
      ) {
        fixRedirects(addedNode);
      }
    }
  }
});

observer.observe(document, { childList: true, subtree: true });
