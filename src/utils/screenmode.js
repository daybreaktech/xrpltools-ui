
export function getScreenMode() {
    let wSize = window.innerWidth;

    if (wSize <= 768) {
        return 'XS';
    } else if(wSize => 769 && wSize <= 992) {
        return 'SM';
    } else if (wSize => 993 && wSize <= 1199) {
        return 'MD';
    } else {
        return 'LG';
    }
}

export function assignSizePerScreen(a, b, c, d) {
    let wSize = window.innerWidth;

    if (wSize <= 768) {
        return a;
    } else if(wSize => 769 && wSize <= 992) {
        return b;
    } else if (wSize => 993 && wSize <= 1199) {
        return c;
    } else {
        return d;
    }
}

