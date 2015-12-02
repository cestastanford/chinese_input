#!/usr/bin/python
#-*- coding: utf-8 -*-
"""
Jason A. Heppler
Python 2.7.6
2015-01-20
"""

from collections import defaultdict
import json
import sys

sys.setrecursionlimit(10000)

def tree():
    return defaultdict(tree)

nested = defaultdict(tree)

words = open("trial.txt").read().splitlines()
words_output = open("out_single.json", "wb")

for word in words:
    node = nested
    for char in word:
        node = node[char.lower()]

def convert(d):
    return dict((key, convert(value)) for (key,value) in d.iteritems()) if isinstance(d, defaultdict) else d

def format(d):
    children = []
    for (key, value) in d.iteritems():
        children += [{"name":key, "children":format(value)}]
    return children

words_output.write(json.dumps(format(convert(nested))))
