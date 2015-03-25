#!/usr/bin/python
#-*- coding: utf-8 -*-
"""
Jason A. Heppler
Python 2.7.4
2015-03-24
"""

def find_words(instring, prefix = '', words = None):
    if not instring:
        return []
    if words is None:
        words = set()
        with open('wordfile.txt') as f:
            for line in f:
                words.add(line.strip())
    if (not prefix) and (instring in words):
        return [instring]
    prefix, suffix = prefix + instring[0], instring[1:]
    solutions = []
    # Case 1: prefix in solution
    if prefix in words:
        try:
            solutions.append([prefix] + find_words(suffix, '', words))
        except ValueError:
            pass
    # Case 2: prefix not in solution
    try:
        solutions.append(find_words(suffix, prefix, words))
    except ValueError:
        pass
    if solutions:
        return sorted(solutions,
                      key = lambda solution: [len(word) for word in solution],
                      reverse = True)[0]
    else:
        raise ValueError('no solution')

result = find_words("xia1ma1yinliao_*junz1*jiu1,wen1junzi1*hesuo1zhi1,junzi1*yan4budeyi1*yi1,guilai1*woshi2*nanshanchui1,danqu1mo1fuxi1*wen1,baiyun1wujinshi33.")

print result
