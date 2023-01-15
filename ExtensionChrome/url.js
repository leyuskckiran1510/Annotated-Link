ids = ['#PICKER-ANOTE-',
	'#BUTTON-ANOTE-',
	'#COMMENT-ANOTE-'
	]


getPath = (element) => {
    var path = [];
    while (element.parentNode !== null) {
        var siblings = element.parentNode.childNodes;
        var count = 0;
        for (var i = 0; i < siblings.length; i++) {
            var sibling = siblings[i];
            if (sibling === element) {
                path.unshift(count);
                break;
            }
            count++;
        }
        element = element.parentNode;
    }
    return path;
}
datas = new Array()
ids = document.body.getAttribute('ids').split(',')
ids.forEach((x) => {
    if (!x || x == 'null' || x == null) return
    let element = document.querySelector(`#COLOR-ANOTE-${x}`)
    let parent = element.parentElement
    let text = element.querySelector(`#COMMENT-ANOTE-${x}`).value
    let color = element.querySelector(`#PICKER-ANOTE-${x}`).value
    let path = getPath(parent).slice(1)

    //console.log(element, parent, text, color, path, navigation)
    datas.push({
        id: x,
        path: path,
        comment: text,
        color: color
    })
})


string = JSON.stringify(datas)
parsed = JSON.parse(string)
console.table(string, datas, parsed)

var encodedString = window.btoa(string);
url = window.location + '#' + encodedString, JSON.parse(window.atob(encodedString))
navigator.clipboard.writeText(url)
console.log(url)