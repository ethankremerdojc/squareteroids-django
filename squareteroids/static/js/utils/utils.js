function randBool() {
    return Math.random() < 0.5;
}

function randInt(max) {
    var val = Math.floor(Math.random() * max);
    var rb = randBool();

    if (rb) {return val * -1;}
    return val;
}

function randWholeNum(max) {
    return Math.floor(Math.random() * max);
}

const getPageDimensions = () => {
    var height = document.body.clientHeight;
    var width = document.body.clientWidth;

    var dims = {
        height: height,
        width: width
    }
    return dims
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
}

function randItem(list) {
    return list[Math.floor(Math.random()*list.length)]
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export {
    randBool, randWholeNum, randInt, getPageDimensions, elementsOverlap, randItem, getCookie
}