#!/usr/bin/RScript

# Converting the Chinese sequence to CSV

library(tidyr)
library(dplyr)

setwd("~/Mullaney/Chinese Computing/data/")

csv <- read.csv("segment2_unclean.csv",header = T,sep = ",")

selected <- csv[1:6,] %>%
  gather(sequence, token, X:X.21)

selected$uniq <- ave( 1:nrow(selected), selected$Trial_Name, factor( selected$token), FUN=function(x) 1:length(x) )

write.csv(selected, "segment2.csv")
