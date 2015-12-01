#!/usr/bin/RScript

# Converting the Chinese sequence raw data to the CSV needed for Palladio
#
# Jason A. Heppler | jason@jasonheppler.org | jasonheppler.org
# MIT License <http://heppler.mit-license.org/>
#
# Created: 2015-12-01

library(tidyr)
library(dplyr)

# Tang
tangtext_csv <- read.csv("data/tangtext.csv",header = T,sep = ",")
tangtext <- tangtext_csv[1:6,] %>%
  gather(sequence, token, X0:X111)

tangtext$uniq <- ave( 1:nrow(tangtext), tangtext$Trial_Name, factor( tangtext$token), FUN=function(x) 1:length(x) )
tangtext$text_seg <- paste(tangtext$Trial_Text, tangtext$Segment, sep="_")

# Madman
madman_csv <- read.csv("data/segment2.csv",header = T,sep = ",")
madmantext <- madman_csv[1:6,] %>%
  gather(sequence, token, X:X.21)

madmantext$uniq <- ave( 1:nrow(madmantext), madmantext$Trial_Name, factor( madmantext$token), FUN=function(x) 1:length(x) )
madmantext$text_seg <- paste(madmantext$Trial_Text, madmantext$Segment, sep="_")

# Write data; import to Palladio to finish prep of JSON
all <- rbind(tangtext, madmantext)
write.csv(tangtext, "tangtext.csv", na = "")
