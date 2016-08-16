import fileinput                         #  1                                                        #  1
                                         #  2                                                        #  2
for line in fileinput.input(inplace=True): #  3                                                      #  3
    line = line.rstrip()                 #  4                                                        #  4
    num = fileinput.lineno()             #  5                                                        #  5
    print '%-100s # %2i' % (line, num)    #  6                                                       #  6
