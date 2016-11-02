
export function getPageName(pageList, pageId) {

    let page = pageList.filter(item => item.id === pageId);
    if(page.length>0) {
        page = page[0].link.match(/^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/)[1];
    } else {
        page = null;
    }

    return page;

}