/* 
    Find longest subsequence of between two strings:
    ex: str1 = abcdef
        str2 = acf
    result = acf
*/

function test (a, b) {
    if (a.length == 0 || b.length == 0) return '';

    const lcsMetrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));

    for (let rowIndex = 0; rowIndex <= a.length; rowIndex += 1) {
        lcsMetrix[rowIndex][0] = 0;
    }

    for (let columnIndex = 0; columnIndex <= b.length; columnIndex += 1) {
        lcsMetrix[0][columnIndex] = 0;
    }

    for (let rowIndex = 1; rowIndex <= a.length; rowIndex += 1) {
        for (let columnIndex = 1; columnIndex <= b.length; columnIndex += 1) {
            if (b[columnIndex - 1] === a[rowIndex - 1]) {
                lcsMetrix[rowIndex][columnIndex] = lcsMetrix[rowIndex - 1][columnIndex - 1] + 1;
            } else {
                lcsMetrix[rowIndex][columnIndex] = Math.max(lcsMetrix[rowIndex - 1][columnIndex], lcsMetrix[rowIndex][columnIndex - 1]);
            }
        }
    }

    let rowIndex = a.length, columnIndex = b.length;
    const longestSequence = [];

    while (rowIndex > 0 || columnIndex > 0) {
        if (b[columnIndex - 1] === a[rowIndex - 1]) {
            longestSequence.unshift(b[columnIndex - 1])
            columnIndex -= 1;
            rowIndex -= 1;
        } else if (lcsMetrix[rowIndex][columnIndex] === lcsMetrix[rowIndex][columnIndex - 1]) {
            columnIndex -= 1;
        } else {
            rowIndex -= 1;
        }
    }

    return longestSequence.toString().replace(/[,]/g, '')
}
