#The following program takes in a cleaned up text file and produces a stream of initial and final characters.
# {"token":"b","type":"initial","uniq":0,"age_group":"___", "dialect":"___","gender":"___","operating_system":"___","input_method":"___","trial":"1"}


while True:
    print "What Chinese text would you like to convert into tokens?",
    text = raw_input().upper()
    if text=="":
        break
    textWithoutCommasAndPeriods = text.replace (",", "").replace(".", "").replace("?", "")
    textWithoutQuadruples = textWithoutCommasAndPeriods.replace("YANG", "yang\n").replace("YING", "y\ning\n").replace("YONG", "y\nong\n").replace("WANG",  "w\nang\n").replace("WENG", "w\neng\n").replace("YUAN", "y\nuan\n").replace("IANG", "iang\n").replace("UANG", "uang\n").replace("UENG", "ueng\n").replace("IONG", "iong\n")
    textWithoutTriples = textWithoutQuadruples.replace("ANG", "ang\n").replace("ONG", "ong\n").replace("ENG", "eng\n").replace("IAO", "iao\n").replace("IAN", "ian\n").replace("ING", "ing\n").replace("UAN", "uan\n").replace("UAI", "uai\n").replace("YOU", "y\nou\n").replace("YAN", "y\nan\n").replace("YIN", "y\nin\n").replace("WEI", "w\nei\n").replace("WAI", "w\nai\n").replace("WAN", "w\nan\n").replace("WEN", "w\nen\n").replace("YUE", "y\nue\n").replace("YUN", "y\nun\n")
    textWithoutDoubleCharacterInitials = textWithoutTriples.replace("SH", "sh\n").replace ("CH", "ch\n"). replace ("ZH", "zh\n")
    textWithoutDoubleCharacterFinals = textWithoutDoubleCharacterInitials.replace("AI", "ai\n").replace("AO", "ao\n").replace("AN", "an\n").replace("OU", "ou\n").replace("EI", "ei\n").replace("ER", "er\n").replace("IA", "ia\n").replace("IE", "ie\n").replace("IU", "iu\n").replace("IN", "in\n").replace("UN", "un\n").replace("UI", "ui\n").replace("UA", "ua\n").replace("UO", "uo\n").replace("EN", "en\n").replace("YI", "y\ni\n").replace("WU", "w\nu\n").replace("WA", "w\na\n").replace("WO", "w\no\n").replace("YU", "y\nu\n").replace("YE", "y\ne\n")
    textWithoutSingleCharacterInitials = textWithoutDoubleCharacterFinals.replace("B", "b\n").replace("P", "p\n").replace("M", "m\n").replace("F", "f\n").replace("D", "d\n").replace("T", "t\n").replace("N", "n\n").replace("L", "l\n").replace("Z", "z\n").replace("C", "c\n").replace("S", "s\n").replace("R", "r\n").replace("J", "j\n").replace("Q", "q\n").replace("X", "x\n").replace("G", "g\n").replace("K", "k\n").replace("H", "h\n")
    textWithoutSingleCharacterFinals = textWithoutSingleCharacterInitials.replace ("A", "a\n").replace ("O", "o\n").replace ("E", "e\n").replace ("I", "i\n").replace ("U", "u\n")
    textWithoutSpaces = textWithoutSingleCharacterFinals.replace("_", "_\n").replace("1", "1\n").replace("2", "2\n").replace("3", "3\n").replace("4", "4\n").replace("5", "5\n").replace("*", "*\n")
    print textWithoutSpaces


singleCharacterInitialList = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'z', 'c', 's', 'r', 'j', 'q', 'x', 'g', 'k', 'h']
doubleCharacterInitialList = ['zh', 'ch', 'sh']
singleCharacterFinalList = ['a',  'o', 'e','i','u']
doubleCharacterFinalList = ['ai', 'ao', 'an', 'ou', 'ei', 'er', 'ia','ie', 'iu', 'in', 'un', 'ui', 'ua', 'uo']
tripleCharacterFinalList = ['ang', 'ong', 'eng', 'iao', 'ian', 'ing', 'uan', 'uan', 'uai']
quadrupleCharacterFinalList =['iang', 'uang', 'ueng', 'iong']
singleFinalsWithoutIntials = ['a', 'o', 'e']
doubleFinalsWithoutIntials = ['ai', 'ao', 'an', 'ou', 'en', 'er', 'yi', 'wu', 'wa', 'wo', 'yu', 'ye']
tripleFinalsWithoutIntials = ['ang', 'eng', 'you', 'yan', 'yin', 'wei', 'wai', 'wan', 'wen', 'yue', 'yun']
quadrupleFinalsWithoutIntials = ['yang', 'ying','yong','wang', 'weng', 'yuan']
enter = [1, 2, 3, 4, 5]
space = ['_']
productivedelete = ['*']
#{"token":"3","type":"selection","uniq":96,"age_group":"12-13,"dialect":"cantonese,"gender":"m,"input_method":"mac,"trial":"2}

#python cant recognize the special u