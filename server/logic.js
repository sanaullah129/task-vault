function repeatChar() {
    const String ="Maharashtra"
    const repeatedChar= {}
    const count=0
    for(let i=0;i<String.length;i++){
        const char=String[i]
        repeatedChar [char]=(repeatedChar[char]||0)+1;
    }
    let repeatedCharcCount=0
        for (const char in repeatedChar) {
        if (repeatedChar[char]>1) {
            repeatedCharcCount++
        }
        
}
return repeatedCharcCount
}

//7506289533
repeatChar();