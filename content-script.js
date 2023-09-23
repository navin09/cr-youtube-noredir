let observer = new MutationObserver(function (mutations) {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      if (
        addedNode.nodeName === "A" &&
        addedNode.hasAttribute("href") &&
        addedNode.href.match(new RegExp("^https://www.youtube.com/redirect"))
      ) {
        let theLink = addedNode.href;
        let query = new URLSearchParams(theLink);
        let redirUrl = query.get("q");
        addedNode.href = redirUrl;
        let redirQuery = new URL(redirUrl);
        addedNode.title = redirQuery.hostname;
      }
    }
  }
});

observer.observe(document, { childList: true, subtree: true });
