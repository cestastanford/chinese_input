#The following program takes in a cleaned up text file and produces a stream of initial and final characters.
# {"token":"b","type":"initial","uniq":0,"age_group":"___", "dialect":"___","gender":"___","operating_system":"___","input_method":"___","trial":"1"}


while True:
    print "What Chinese text would you like to convert into tokens?",
    text = raw_input().upper()
    if text=="":
        break
    textWithoutCommasAndPeriods = text.replace (",", "").replace(".", "").replace("?", "")
    textWithoutQuadruples = textWithoutCommasAndPeriods.replace("YANG", "{\"token\":\"yang\",\"type\":\"final\",\"uniq\": \n").replace("YING", "{\"token\":\"ying\",\"type\":\"final\",\"uniq\": \n").replace("YONG", "{\"token\":\"yong\",\"type\":\"final\",\"uniq\": \n").replace("WANG", "{\"token\":\"wang\",\"type\":\"final\",\"uniq\": \n").replace("WENG", "{\"token\":\"weng\",\"type\":\"final\",\"uniq\": \n").replace("YUAN", "{\"token\":\"yuan\",\"type\":\"final\",\"uniq\": \n").replace("IANG", "{\"token\":\"iang\",\"type\":\"final\",\"uniq\": \n").replace("UANG", "{\"token\":\"uang\",\"type\":\"final\",\"uniq\": \n").replace("UENG", "{\"token\":\"ueng\",\"type\":\"final\",\"uniq\": \n").replace("IONG", "{\"token\":\"iong\",\"type\":\"final\",\"uniq\": \n")
    textWithoutTriples = textWithoutQuadruples.replace("ANG", "{\"token\":\"ang\",\"type\":\"final\",\"uniq\": \n").replace("ONG", "{\"token\":\"ong\",\"type\":\"final\",\"uniq\": \n").replace("ENG", "{\"token\":\"eng\",\"type\":\"final\",\"uniq\": \n").replace("IAO", "{\"token\":\"iao\",\"type\":\"final\",\"uniq\": \n").replace("IAN", "{\"token\":\"ian\",\"type\":\"final\",\"uniq\": \n").replace("ING", "{\"token\":\"ing\",\"type\":\"final\",\"uniq\": \n").replace("UAN", "{\"token\":\"uan\",\"type\":\"final\",\"uniq\": \n").replace("UAI", "{\"token\":\"uai\",\"type\":\"final\",\"uniq\": \n").replace("YOU", "{\"token\":\"you\",\"type\":\"final\",\"uniq\": \n").replace("YAN", "{\"token\":\"yan\",\"type\":\"final\",\"uniq\": \n").replace("YIN", "{\"token\":\"yin\",\"type\":\"final\",\"uniq\": \n").replace("WEI", "{\"token\":\"wei\",\"type\":\"final\",\"uniq\": \n").replace("WAI", "{\"token\":\"wai\",\"type\":\"final\",\"uniq\": \n").replace("WAN", "{\"token\":\"wan\",\"type\":\"final\",\"uniq\": \n").replace("WEN", "{\"token\":\"wen\",\"type\":\"final\",\"uniq\": \n").replace("YUE", "{\"token\":\"yue\",\"type\":\"final\",\"uniq\": \n").replace("YUN", "{\"token\":\"yun\",\"type\":\"final\",\"uniq\": \n")
    textWithoutDoubleCharacterInitials = textWithoutTriples.replace("SH", "{\"token\":\"sh\",\"type\":\"initial\",\"uniq\": \n").replace ("CH", "{\"token\":\"ch\",\"type\":\"initial\",\"uniq\": \n"). replace ("ZH", "{\"token\":\"zh\",\"type\":\"initial\",\"uniq\": \n")
    textWithoutDoubleCharacterFinals = textWithoutDoubleCharacterInitials.replace("AI", "{\"token\":\"ai\",\"type\":\"final\",\"uniq\": \n").replace("AO", "{\"token\":\"ao\",\"type\":\"final\",\"uniq\": \n").replace("AN", "{\"token\":\"an\",\"type\":\"final\",\"uniq\": \n").replace("OU", "{\"token\":\"ou\",\"type\":\"final\",\"uniq\": \n").replace("EI", "{\"token\":\"ei\",\"type\":\"final\",\"uniq\": \n").replace("ER", "{\"token\":\"er\",\"type\":\"final\",\"uniq\": \n").replace("IA", "{\"token\":\"ia\",\"type\":\"final\",\"uniq\": \n").replace("IE", "{\"token\":\"ie\",\"type\":\"final\",\"uniq\": \n").replace("IU", "{\"token\":\"iu\",\"type\":\"final\",\"uniq\": \n").replace("IN", "{\"token\":\"in\",\"type\":\"final\",\"uniq\": \n").replace("UN", "{\"token\":\"un\",\"type\":\"final\",\"uniq\": \n").replace("UI", "{\"token\":\"ui\",\"type\":\"final\",\"uniq\": \n").replace("UA", "{\"token\":\"ua\",\"type\":\"final\",\"uniq\": \n").replace("UO", "{\"token\":\"uo\",\"type\":\"final\",\"uniq\": \n").replace("EN", "{\"token\":\"en\",\"type\":\"final\",\"uniq\": \n").replace("YI", "{\"token\":\"yi\",\"type\":\"final\",\"uniq\": \n").replace("WU", "{\"token\":\"wu\",\"type\":\"final\",\"uniq\": \n").replace("WA", "{\"token\":\"wa\",\"type\":\"final\",\"uniq\": \n").replace("WO", "{\"token\":\"wo\",\"type\":\"final\",\"uniq\": \n").replace("YU", "{\"token\":\"yu\",\"type\":\"final\",\"uniq\": \n").replace("YE", "{\"token\":\"ye\",\"type\":\"final\",\"uniq\": \n")
    textWithoutSingleCharacterInitials = textWithoutDoubleCharacterFinals.replace("B", "{\"token\":\"b\",\"type\":\"initial\",\"uniq\": \n").replace("P", "{\"token\":\"p\",\"type\":\"initial\",\"uniq\": \n").replace("M", "{\"token\":\"m\",\"type\":\"initial\",\"uniq\": \n").replace("F", "{\"token\":\"f\",\"type\":\"initial\",\"uniq\": \n").replace("D", "{\"token\":\"d\",\"type\":\"initial\",\"uniq\": \n").replace("T", "{\"token\":\"t\",\"type\":\"initial\",\"uniq\": \n").replace("N", "{\"token\":\"n\",\"type\":\"initial\",\"uniq\": \n").replace("L", "{\"token\":\"l\",\"type\":\"initial\",\"uniq\": \n").replace("Z", "{\"token\":\"z\",\"type\":\"initial\",\"uniq\": \n").replace("C", "{\"token\":\"c\",\"type\":\"initial\",\"uniq\": \n").replace("S", "{\"token\":\"s\",\"type\":\"initial\",\"uniq\": \n").replace("R", "{\"token\":\"r\",\"type\":\"initial\",\"uniq\": \n").replace("J", "{\"token\":\"j\",\"type\":\"initial\",\"uniq\": \n").replace("Q", "{\"token\":\"q\",\"type\":\"initial\",\"uniq\": \n").replace("X", "{\"token\":\"x\",\"type\":\"initial\",\"uniq\": \n").replace("G", "{\"token\":\"g\",\"type\":\"initial\",\"uniq\": \n").replace("K", "{\"token\":\"k\",\"type\":\"initial\",\"uniq\": \n").replace("H", "{\"token\":\"h\",\"type\":\"initial\",\"uniq\": \n")
    textWithoutSingleCharacterFinals = textWithoutSingleCharacterInitials.replace ("A", "{\"token\":\"a\",\"type\":\"final\",\"uniq\": \n").replace ("O", "{\"token\":\"o\",\"type\":\"final\",\"uniq\": \n").replace ("E", "{\"token\":\"e\",\"type\":\"final\",\"uniq\": \n").replace ("I", "{\"token\":\"i\",\"type\":\"final\",\"uniq\": \n").replace ("U", "{\"token\":\"u\",\"type\":\"final\",\"uniq\": \n")
    textWithoutSpaces = textWithoutSingleCharacterFinals.replace("_", "{\"token\":\"_\",\"type\":\"selection\",\"uniq\": \n").replace("1", "{\"token\":\"1\",\"type\":\"selection\",\"uniq\": \n").replace("2", "{\"token\":\"2\",\"type\":\"selection\",\"uniq\": \n").replace("3", "{\"token\":\"3\",\"type\":\"selection\",\"uniq\": \n").replace("4", "{\"token\":\"4\",\"type\":\"selection\",\"uniq\": \n").replace("5", "{\"token\":\"5\",\"type\":\"selection\",\"uniq\": \n").replace("*", "{\"token\":\"*\",\"type\":\"productive-delete\",\"uniq\": \n")
    print "What is the age group?",
    age_group = raw_input().lower()
    print "What is the dialect?",
    dialect = raw_input().lower()
    print "What is the gender?",
    gender = raw_input().lower()
    print "What is the operating System?",
    operating_system = raw_input().lower()
    print "What is the input method?",
    input_method = raw_input().lower()
    print "What is the trial?",
    trial = raw_input().lower()
    counter = 0
    result=""
#,"age_group":"___", "dialect":"___","gender":"___","operating_system":"___","input_method":"___","trial":"1"}
    for c in textWithoutSpaces:
        if c==" ":
            result=result+str(counter)+",\"age_group\":\"" + age_group +"\",\"dialect\":\"" + dialect +"\",\"gender\":\"" + gender +"\",\"operating_system\":\"" +operating_system +"\",\"input_method\":\"" + input_method +"\",\"trial\":" + trial + "}"
            counter=counter+1
        else: result=result+c
    print result


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